"use strict";

const RASTERS = {
  2020: { name: "April 2020", prefix: "data/ndvi_2020" },
  2026: { name: "April 2026", prefix: "data/ndvi_2026" }
};
const elements = {
  status: document.getElementById("status-label"),
  crs: document.getElementById("crs-value"),
  grid: document.getElementById("grid-value"),
  valid2020: document.getElementById("valid-2020"),
  valid2026: document.getElementById("valid-2026"),
  source: document.getElementById("raster-source"),
  error: document.getElementById("map-error"),
  divider: document.getElementById("swipe-divider"),
  handle: document.getElementById("swipe-handle"),
  mapShell: document.querySelector(".map-shell")
};

const map = L.map("map", { zoomControl: false, preferCanvas: true }).setView([18.99, 96.03], 13);
L.control.zoom({ position: "bottomright" }).addTo(map);
L.control.scale({ position: "bottomleft", metric: true, imperial: false }).addTo(map);

const streetBase = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const satelliteBase = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 19,
  attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics"
});

const rasters = {};
let activeBase = satelliteBase;
let mode = "swipe";
let swipePercent = 50;
satelliteBase.addTo(map);

document.querySelectorAll(".basemap-button").forEach((button) => {
  button.addEventListener("click", () => {
    const nextBase = button.dataset.basemap === "street" ? streetBase : satelliteBase;
    if (nextBase !== activeBase) {
      map.removeLayer(activeBase);
      nextBase.addTo(map);
      activeBase = nextBase;
    }
    document.querySelectorAll(".basemap-button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
  });
});

function updateSwipe() {
  const after = rasters[2026];
  if (after && after.layer.getElement()) {
    after.layer.getElement().style.clipPath = mode === "swipe"
      ? `inset(0 0 0 ${swipePercent}%)`
      : "none";
  }
  elements.divider.style.left = `${swipePercent}%`;
  elements.handle.setAttribute("aria-valuenow", String(Math.round(swipePercent)));
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll(".mode-button").forEach((button) => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  Object.entries(rasters).forEach(([year, raster]) => {
    const visible = mode === "swipe" || String(year) === mode;
    if (visible && !map.hasLayer(raster.layer)) raster.layer.addTo(map);
    if (!visible && map.hasLayer(raster.layer)) map.removeLayer(raster.layer);
  });
  elements.divider.hidden = mode !== "swipe";
  document.querySelector(".year-before").hidden = mode === "2026";
  document.querySelector(".year-after").hidden = mode === "2020";
  updateSwipe();
}

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

function moveSwipe(clientX) {
  const bounds = elements.mapShell.getBoundingClientRect();
  swipePercent = Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100));
  updateSwipe();
}

elements.handle.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  event.stopPropagation();
  elements.handle.setPointerCapture(event.pointerId);
  moveSwipe(event.clientX);
});
elements.handle.addEventListener("pointermove", (event) => {
  if (elements.handle.hasPointerCapture(event.pointerId)) {
    event.preventDefault();
    moveSwipe(event.clientX);
  }
});
elements.handle.addEventListener("keydown", (event) => {
  let next;
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = swipePercent - 2;
  else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = swipePercent + 2;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = 100;
  if (next !== undefined) {
    event.preventDefault();
    swipePercent = Math.min(100, Math.max(0, next));
    updateSwipe();
  }
});
L.DomEvent.disableClickPropagation(elements.handle);

document.querySelectorAll(".opacity-control input").forEach((input) => {
  input.addEventListener("input", () => {
    const year = input.id.endsWith("2020") ? 2020 : 2026;
    const output = document.getElementById(`${input.id}-value`);
    output.value = `${input.value}%`;
    if (rasters[year]) rasters[year].layer.setOpacity(Number(input.value) / 100);
  });
});

function showError(message) {
  elements.status.textContent = "Imagery unavailable";
  document.querySelector(".status-dot").style.background = "#d16d58";
  elements.error.textContent = message;
  elements.error.hidden = false;
  elements.source.textContent = "Build the aligned raster assets, then reload the page.";
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function waitForLayer(layer) {
  return new Promise((resolve, reject) => {
    const finish = (error) => {
      window.clearTimeout(timeout);
      layer.off("load", onLoad);
      layer.off("error", onError);
      if (error) reject(error);
      else resolve();
    };
    const onLoad = () => finish();
    const onError = () => finish(new Error("An NDVI color overlay image could not be decoded."));
    const timeout = window.setTimeout(
      () => finish(new Error("Timed out while loading an NDVI color overlay.")),
      15000
    );
    layer.once("load", onLoad);
    layer.once("error", onError);
  });
}

async function loadYear(year, config) {
  const responses = await Promise.all([
    fetch(`${config.prefix}.json`),
    fetch(`${config.prefix}.png`),
    fetch(`${config.prefix}.f64`),
    fetch(`${config.prefix}.mask`)
  ]);
  const failed = responses.find((response) => !response.ok);
  if (failed) throw new Error(`${config.name} raster asset failed to load (HTTP ${failed.status}).`);

  const [info, imageBlob, valuesBuffer, maskBuffer] = await Promise.all([
    responses[0].json(),
    responses[1].blob(),
    responses[2].arrayBuffer(),
    responses[3].arrayBuffer()
  ]);
  const cellCount = info.width * info.height;
  if (valuesBuffer.byteLength !== cellCount * 8 || maskBuffer.byteLength !== cellCount) {
    throw new Error(`${config.name} raster dimensions do not match its values or NoData mask.`);
  }

  const imageUrl = URL.createObjectURL(imageBlob);
  const opacity = Number(document.getElementById(`opacity-${year}`).value) / 100;
  const bounds = [[info.bounds[1], info.bounds[0]], [info.bounds[3], info.bounds[2]]];
  rasters[year] = {
    info,
    values: new DataView(valuesBuffer),
    valid: new Uint8Array(maskBuffer),
    layer: L.imageOverlay(imageUrl, bounds, { opacity, interactive: false })
  };
}

async function loadComparison() {
  try {
    await Promise.all(Object.entries(RASTERS).map(([year, config]) => loadYear(year, config)));
    const before = rasters[2020].info;
    const after = rasters[2026].info;
    if (
      before.width !== after.width ||
      before.height !== after.height ||
      before.crs !== after.crs ||
      before.transform.some((value, index) => value !== after.transform[index])
    ) {
      throw new Error("The two yearly rasters are not aligned to the same grid.");
    }

    elements.crs.textContent = before.crs;
    elements.grid.textContent = `${formatNumber(before.width)} × ${formatNumber(before.height)}`;
    elements.valid2020.textContent = formatNumber(before.valid_cells);
    elements.valid2026.textContent = formatNumber(after.valid_cells);
    elements.source.textContent = `2020: ${before.source} · 2026: ${after.source} (bilinear resampling to the 2020 grid)`;
    const bounds = [[before.bounds[1], before.bounds[0]], [before.bounds[3], before.bounds[2]]];
    map.fitBounds(bounds, { padding: [24, 24] });
    const imageLoads = Object.values(rasters).map(({ layer }) => waitForLayer(layer));
    setMode(mode);
    await Promise.all(imageLoads);
    elements.status.textContent = "Both years loaded";
    document.querySelector(".status-dot").style.background = "#78b17c";
    document.querySelector(".status-dot").style.boxShadow = "0 0 0 3px #78b17c28";
  } catch (error) {
    console.error("NDVI comparison load failed:", error);
    showError(error instanceof Error ? error.message : "The NDVI comparison could not be loaded.");
  }
}

function sampleValue(raster, latitude, longitude) {
  const [a, b, c, d, e, f] = raster.info.transform;
  const determinant = a * e - b * d;
  const x = longitude - c;
  const y = latitude - f;
  const column = Math.floor((e * x - b * y) / determinant);
  const row = Math.floor((a * y - d * x) / determinant);
  if (column < 0 || column >= raster.info.width || row < 0 || row >= raster.info.height) return null;
  const index = row * raster.info.width + column;
  if (raster.valid[index] === 0) return null;
  return raster.values.getFloat64(index * 8, true);
}

function formatValue(value) {
  return value === null ? "NoData / cloud-masked" : value.toFixed(4);
}

map.on("click", (event) => {
  if (!rasters[2020] || !rasters[2026]) return;
  const latitude = event.latlng.lat;
  const longitude = event.latlng.lng;
  const before = sampleValue(rasters[2020], latitude, longitude);
  const after = sampleValue(rasters[2026], latitude, longitude);
  const difference = before === null || after === null ? null : after - before;
  const differenceText = difference === null ? "Unavailable (NoData in one or both years)" : `${difference >= 0 ? "+" : ""}${difference.toFixed(4)}`;
  const content = `
    <div class="sample-popup">
      <strong>NDVI vegetation change indicator</strong>
      <span class="sample-row"><span>Latitude</span><b>${latitude.toFixed(5)}°</b></span>
      <span class="sample-row"><span>Longitude</span><b>${longitude.toFixed(5)}°</b></span>
      <span class="sample-row"><span>April 2020</span><b>${formatValue(before)}</b></span>
      <span class="sample-row"><span>April 2026</span><b>${formatValue(after)}</b></span>
      <span class="sample-row difference-row"><span>Difference (2026 − 2020)</span><b>${differenceText}</b></span>
      <small>Values sampled from the same aligned pixel grid.</small>
    </div>`;
  L.popup().setLatLng(event.latlng).setContent(content).openOn(map);
});

loadComparison();
