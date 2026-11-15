import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers3, MapPin, Satellite } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import metadata2020 from "../../../web/data/ndvi_2020.json";
import metadata2026 from "../../../web/data/ndvi_2026.json";
import image2020 from "../../../web/data/ndvi_2020.png?url";
import image2026 from "../../../web/data/ndvi_2026.png?url";
import values2020 from "../../../web/data/ndvi_2020.f64?url";
import values2026 from "../../../web/data/ndvi_2026.f64?url";
import mask2020 from "../../../web/data/ndvi_2020.mask?url";
import mask2026 from "../../../web/data/ndvi_2026.mask?url";

type RasterMetadata = {
  source: string;
  width: number;
  height: number;
  crs: string;
  bounds: number[];
  transform: number[];
  valid_cells: number;
  display_range: number[];
};
type RasterData = {
  metadata: RasterMetadata;
  values: DataView;
  valid: Uint8Array;
  layer: L.ImageOverlay;
};
type Year = "2020" | "2026";
type Mode = "swipe" | Year;
type Basemap = "satellite" | "street";

const rasterConfig: Record<
  Year,
  { metadata: RasterMetadata; image: string; values: string; mask: string }
> = {
  "2020": {
    metadata: metadata2020,
    image: image2020,
    values: values2020,
    mask: mask2020,
  },
  "2026": {
    metadata: metadata2026,
    image: image2026,
    values: values2026,
    mask: mask2026,
  },
};

async function fetchRaster(year: Year): Promise<Omit<RasterData, "layer">> {
  const config = rasterConfig[year];
  const [valuesResponse, maskResponse] = await Promise.all([
    fetch(config.values),
    fetch(config.mask),
  ]);
  if (!valuesResponse.ok || !maskResponse.ok)
    throw new Error(`${year} NDVI raster data could not be loaded.`);
  const [valuesBuffer, maskBuffer] = await Promise.all([
    valuesResponse.arrayBuffer(),
    maskResponse.arrayBuffer(),
  ]);
  const cellCount = config.metadata.width * config.metadata.height;
  if (
    valuesBuffer.byteLength !== cellCount * Float64Array.BYTES_PER_ELEMENT ||
    maskBuffer.byteLength !== cellCount
  ) {
    throw new Error(
      `${year} NDVI raster dimensions do not match its value and mask files.`,
    );
  }
  return {
    metadata: config.metadata,
    values: new DataView(valuesBuffer),
    valid: new Uint8Array(maskBuffer),
  };
}

const NDVIComparisonMap = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const shellRef = useRef<HTMLDivElement | null>(null);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const baseLayerRef = useRef<L.TileLayer | null>(null);
  const rastersRef = useRef<Partial<Record<Year, RasterData>>>({});
  const [mode, setMode] = useState<Mode>("swipe");
  const [basemap, setBasemap] = useState<Basemap>("satellite");
  const [swipePercent, setSwipePercent] = useState(50);
  const [opacity, setOpacity] = useState<Record<Year, number>>({
    "2020": 90,
    "2026": 90,
  });
  const [status, setStatus] = useState("Loading imagery…");
  const [rasterReady, setRasterReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;
    const map = L.map(mapElementRef.current, {
      zoomControl: true,
      preferCanvas: true,
    });
    mapRef.current = map;
    const satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Imagery &copy; Esri" },
    );
    satellite.addTo(map);
    baseLayerRef.current = satellite;
    L.control
      .scale({ position: "bottomleft", metric: true, imperial: false })
      .addTo(map);

    let cancelled = false;
    const loadYear = async (year: Year): Promise<RasterData> => {
      const data = await fetchRaster(year);
      const bounds = data.metadata.bounds;
      const layer = L.imageOverlay(
        rasterConfig[year].image,
        [
          [bounds[1], bounds[0]],
          [bounds[3], bounds[2]],
        ],
        { opacity: 0.9, interactive: false },
      );
      return { ...data, layer };
    };

    Promise.all([loadYear("2020"), loadYear("2026")])
      .then(([before, after]) => {
        if (cancelled) return;
        const first = before.metadata;
        const second = after.metadata;
        if (
          first.width !== second.width ||
          first.height !== second.height ||
          first.crs !== second.crs ||
          first.transform.some(
            (value, index) => value !== second.transform[index],
          )
        ) {
          throw new Error(
            "The 2020 and 2026 rasters are not aligned to the same pixel grid.",
          );
        }
        rastersRef.current = { "2020": before, "2026": after };
        const bounds = first.bounds;
        map.fitBounds(
          [
            [bounds[1], bounds[0]],
            [bounds[3], bounds[2]],
          ],
          { padding: [24, 24] },
        );

        setRasterReady(true);
        setStatus("Both years loaded");
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "The NDVI comparison could not be loaded.",
          );
          setStatus("Imagery unavailable");
        }
      });

    const sampleValue = (
      raster: RasterData,
      latitude: number,
      longitude: number,
    ) => {
      const [a, b, c, d, e, f] = raster.metadata.transform;
      const determinant = a * e - b * d;
      const x = longitude - c;
      const y = latitude - f;
      const column = Math.floor((e * x - b * y) / determinant);
      const row = Math.floor((a * y - d * x) / determinant);
      if (
        column < 0 ||
        column >= raster.metadata.width ||
        row < 0 ||
        row >= raster.metadata.height
      )
        return null;
      const index = row * raster.metadata.width + column;
      return raster.valid[index] === 0
        ? null
        : raster.values.getFloat64(
            index * Float64Array.BYTES_PER_ELEMENT,
            true,
          );
    };
    const formatValue = (value: number | null) =>
      value === null ? "NoData / cloud-masked" : value.toFixed(4);
    const handleClick = (event: L.LeafletMouseEvent) => {
      const before = rastersRef.current["2020"];
      const after = rastersRef.current["2026"];
      if (!before || !after) return;
      const { lat, lng } = event.latlng;
      const beforeValue = sampleValue(before, lat, lng);
      const afterValue = sampleValue(after, lat, lng);
      const delta =
        beforeValue === null || afterValue === null
          ? null
          : afterValue - beforeValue;
      const deltaText =
        delta === null
          ? "Unavailable (NoData in one or both years)"
          : `${delta >= 0 ? "+" : ""}${delta.toFixed(4)}`;
      const popup = `<div><strong>NDVI vegetation change indicator</strong><br/>Latitude: ${lat.toFixed(5)}°<br/>Longitude: ${lng.toFixed(5)}°<br/>April 2020: ${formatValue(beforeValue)}<br/>April 2026: ${formatValue(afterValue)}<br/>Difference (2026 − 2020): ${deltaText}<br/><small>Values sampled from the same aligned pixel grid.</small></div>`;
      L.popup().setLatLng(event.latlng).setContent(popup).openOn(map);
    };
    map.on("click", handleClick);

    return () => {
      cancelled = true;
      map.off("click", handleClick);
      map.remove();
      mapRef.current = null;
      baseLayerRef.current = null;
      rastersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const year of ["2020", "2026"] as const) {
      const raster = rastersRef.current[year];
      if (raster) raster.layer.setOpacity(opacity[year] / 100);
    }
    for (const year of ["2020", "2026"] as const) {
      const raster = rastersRef.current[year];
      if (!raster) continue;
      const shouldShow = mode === "swipe" || mode === year;
      if (shouldShow && !map.hasLayer(raster.layer)) raster.layer.addTo(map);
      if (!shouldShow && map.hasLayer(raster.layer))
        map.removeLayer(raster.layer);
    }
    const laterLayer = rastersRef.current["2026"]?.layer.getElement();
    if (laterLayer)
      laterLayer.style.clipPath =
        mode === "swipe" ? `inset(0 0 0 ${swipePercent}%)` : "none";
  }, [mode, opacity, swipePercent, rasterReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (baseLayerRef.current) map.removeLayer(baseLayerRef.current);
    const url =
      basemap === "satellite"
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution =
      basemap === "satellite"
        ? "Imagery &copy; Esri"
        : "&copy; OpenStreetMap contributors";
    baseLayerRef.current = L.tileLayer(url, { maxZoom: 19, attribution }).addTo(
      map,
    );
  }, [basemap]);

  const setSwipeFromClientX = (clientX: number) => {
    const bounds = shellRef.current?.getBoundingClientRect();
    if (!bounds || !bounds.width) return;
    setSwipePercent(
      Math.min(
        100,
        Math.max(0, ((clientX - bounds.left) / bounds.width) * 100),
      ),
    );
  };
  const panel = isDark
    ? "border-slate-700 bg-[#0B1220]"
    : "border-[#dce6da] bg-[#f8faf6]";
  const button = isDark
    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
    : "border-[#dce6da] text-[#52665a] hover:bg-[#eef3eb]";
  const heading = isDark ? "text-slate-100" : "text-[#263a31]";
  const muted = isDark ? "text-slate-400" : "text-[#647568]";

  return (
    <section
      className={`overflow-hidden rounded-2xl border ${isDark ? "border-slate-800 bg-[#111827]" : "border-[#dce6da] bg-white"}`}
    >
      <header
        className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}
      >
        <div>
          <div
            className={`mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.6px] ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
          >
            <Satellite size={13} />
            Sentinel-2 vegetation comparison
          </div>
          <h2 className={`font-heading text-base font-bold ${heading}`}>
            April 2020 vs April 2026 NDVI
          </h2>
          <p className={`mt-1 text-[11px] ${muted}`}>
            {metadata2020.width} × {metadata2020.height} aligned pixels ·{" "}
            {metadata2020.crs} · {status}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {(["swipe", "2020", "2026"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${mode === value ? "border-emerald-600 bg-emerald-600 text-white" : button}`}
            >
              {value === "swipe" ? "Swipe" : `${value} only`}
            </button>
          ))}
        </div>
      </header>
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside
          className={`space-y-5 border-b p-5 lg:border-b-0 lg:border-r ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}
        >
          <div>
            <p
              className={`mb-2 flex items-center gap-2 text-xs font-semibold ${heading}`}
            >
              <Layers3 size={14} />
              Basemap
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["satellite", "street"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBasemap(value)}
                  aria-pressed={basemap === value}
                  className={`rounded-lg border px-2 py-2 text-[11px] font-medium ${basemap === value ? "border-emerald-600 bg-emerald-600 text-white" : button}`}
                >
                  {value === "street" ? "OpenStreetMap" : "Satellite"}
                </button>
              ))}
            </div>
          </div>
          {(["2020", "2026"] as const).map((year) => (
            <label key={year} className="block">
              <span
                className={`mb-2 flex justify-between gap-2 text-[11px] ${muted}`}
              >
                <span>April {year} opacity</span>
                <span>{opacity[year]}%</span>
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity[year]}
                onChange={(event) =>
                  setOpacity((current) => ({
                    ...current,
                    [year]: Number(event.target.value),
                  }))
                }
                className="w-full accent-emerald-600"
              />
            </label>
          ))}
          <div>
            <p className={`mb-2 text-xs font-semibold ${heading}`}>
              NDVI display scale
            </p>
            <div
              className="h-3 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg,#b03631,#e98f48,#f1dc70,#83b567,#237045)",
              }}
            />
            <div className={`mt-1 flex justify-between text-[10px] ${muted}`}>
              <span>−0.2 low</span>
              <span>0.45</span>
              <span>0.9 high</span>
            </div>
            <p className={`mt-2 text-[10px] leading-4 ${muted}`}>
              Higher NDVI generally indicates denser green vegetation. This is a
              vegetation change indicator, not confirmation of deforestation.
            </p>
          </div>
          <div
            className={`rounded-xl border p-3 text-[10px] leading-4 ${panel} ${muted}`}
          >
            <span className="mb-1 flex items-center gap-1 font-semibold">
              <MapPin size={12} />
              Aligned raster grid
            </span>
            {metadata2020.valid_cells.toLocaleString()} valid pixels per year
            <br />
            Source 2020: {metadata2020.source}
            <br />
            Source 2026: {metadata2026.source}
          </div>
        </aside>
        <div
          ref={shellRef}
          className="relative h-[min(68vh,620px)] min-h-[390px]"
        >
          <div ref={mapElementRef} className="z-0 h-full w-full" />
          {mode === "swipe" && (
            <div
              className="pointer-events-none absolute inset-y-0 z-[500]"
              style={{ left: `${swipePercent}%` }}
            >
              <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_#0008]" />
              <button
                type="button"
                role="slider"
                aria-label="Swipe between April 2020 and April 2026 NDVI"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(swipePercent)}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setSwipeFromClientX(event.clientX);
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId))
                    setSwipeFromClientX(event.clientX);
                }}
                onKeyDown={(event) => {
                  const delta =
                    event.key === "ArrowLeft" || event.key === "ArrowDown"
                      ? -2
                      : event.key === "ArrowRight" || event.key === "ArrowUp"
                        ? 2
                        : event.key === "Home"
                          ? -100
                          : event.key === "End"
                            ? 100
                            : 0;
                  if (delta) {
                    event.preventDefault();
                    setSwipePercent((current) =>
                      Math.max(0, Math.min(100, current + delta)),
                    );
                  }
                }}
                className="pointer-events-auto absolute left-0 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 grid-cols-2 place-items-center rounded-full border-2 border-white bg-emerald-700 text-lg text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                ‹›
              </button>
            </div>
          )}
          {mode !== "2026" && (
            <span className="pointer-events-none absolute left-3 top-3 z-[450] rounded-lg border border-white/20 bg-slate-950/80 px-3 py-2 text-[10px] font-bold tracking-wide text-white">
              APRIL 2020
            </span>
          )}
          {mode !== "2020" && (
            <span className="pointer-events-none absolute right-3 top-3 z-[450] rounded-lg border border-white/20 bg-slate-950/80 px-3 py-2 text-[10px] font-bold tracking-wide text-white">
              APRIL 2026
            </span>
          )}
          {error && (
            <p
              role="alert"
              className="absolute left-3 right-3 top-14 z-[600] rounded-lg border border-rose-400/40 bg-rose-950/90 p-3 text-xs text-white"
            >
              {error}
            </p>
          )}
          <p className="pointer-events-none absolute bottom-3 left-1/2 z-[450] -translate-x-1/2 rounded-lg border border-white/20 bg-slate-950/80 px-3 py-2 text-[10px] text-white">
            Click map to compare both NDVI values and their difference
          </p>
        </div>
      </div>
    </section>
  );
};

export default NDVIComparisonMap;
