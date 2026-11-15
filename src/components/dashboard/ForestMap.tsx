import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Layers3, Satellite, Eye, EyeOff, Info } from "lucide-react";

import { useTheme } from "../../context/ThemeProvider";

import {
  classificationBanners,
  classificationCounts,
  loadBlockFeatures,
  loadRedDemoOverlay,
  projectMetadata,
  redDemoDetails,
  type Classification,
} from "../../data/projectData";

// ---------------------------------------------
// CLASSIFICATION CONFIGURATION
// ---------------------------------------------

const classes: Classification[] = ["RED", "YELLOW", "GREEN", "GREY"];

const colorByClass: Record<Classification, string> = {
  RED: "#D93025",
  YELLOW: "#F2C94C",
  GREEN: "#2E9D50",
  GREY: "#808080",
};

const boundsData = projectMetadata.aoi.bounds;

const aoiBounds = L.latLngBounds(
  [boundsData.south, boundsData.west],
  [boundsData.north, boundsData.east],
);

// ---------------------------------------------
// COORDINATE TOOLTIP
// ---------------------------------------------

const coordinatesLabel = (point: L.LatLng) =>
  `Latitude: ${point.lat.toFixed(6)}<br/>Longitude: ${point.lng.toFixed(6)}`;

// ---------------------------------------------
// POPUP HELPERS
// ---------------------------------------------

const formatLabel = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const createPossibleCausesPopup = (demoId: string) => {
  const zone = redDemoDetails.zones.find((item) => item.demo_id === demoId);

  if (!zone) {
    throw new Error(`No investigation details found for ${demoId}.`);
  }

  const content = document.createElement("div");
  content.className = "forest-investigation-popup";

  Object.assign(content.style, {
    width: "100%",
    maxWidth: "390px",
    maxHeight: "420px",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "5px",
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#263A31",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  });

  // ---------------------------------------------
  // POPUP TITLE
  // ---------------------------------------------

  const title = document.createElement("h3");

  title.textContent = `${zone.demo_id} · Forest Investigation`;

  Object.assign(title.style, {
    fontSize: "16px",
    fontWeight: "800",
    margin: "0 0 12px",
    color: "#D93025",
    lineHeight: "1.4",
  });

  content.append(title);

  // ---------------------------------------------
  // WARNING BANNER
  // ---------------------------------------------

  const warning = document.createElement("div");

  warning.textContent = `⚠ ${zone.warning}`;

  Object.assign(warning.style, {
    background: "#FEF2F2",
    color: "#991B1B",
    border: "1px solid #FECACA",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "14px",
    fontWeight: "600",
    lineHeight: "1.5",
  });

  content.append(warning);

  // ---------------------------------------------
  // RECURSIVE JSON RENDERER
  // Handles objects, arrays, strings, numbers,
  // and boolean values.
  // ---------------------------------------------

  const renderValue = (
    parent: HTMLElement,
    key: string,
    value: unknown,
    depth = 0,
  ): void => {
    if (value === null || value === undefined) {
      return;
    }

    const wrapper = document.createElement("div");

    Object.assign(wrapper.style, {
      marginTop: depth === 0 ? "13px" : "7px",
      paddingLeft: depth > 0 ? "10px" : "0",
      borderLeft: depth > 0 ? "2px solid #DCE6DA" : "none",
    });

    // -------------------------------------------
    // NESTED OBJECT
    // -------------------------------------------

    if (typeof value === "object" && !Array.isArray(value)) {
      const heading = document.createElement("div");

      heading.textContent = formatLabel(key);

      Object.assign(heading.style, {
        fontSize: depth === 0 ? "13px" : "12px",
        fontWeight: "800",
        color: "#23734D",
        borderBottom: "1px solid #DCE6DA",
        paddingBottom: "5px",
        marginBottom: "7px",
      });

      wrapper.append(heading);

      Object.entries(value as Record<string, unknown>).forEach(
        ([childKey, childValue]) => {
          renderValue(wrapper, childKey, childValue, depth + 1);
        },
      );
    }

    // -------------------------------------------
    // ARRAY
    // -------------------------------------------
    else if (Array.isArray(value)) {
      const heading = document.createElement("strong");

      heading.textContent = formatLabel(key);

      Object.assign(heading.style, {
        display: "block",
        marginBottom: "5px",
        color: "#334155",
        fontSize: "12px",
      });

      wrapper.append(heading);

      const list = document.createElement("ul");

      Object.assign(list.style, {
        paddingLeft: "18px",
        margin: "4px 0",
        listStyleType: "disc",
      });

      value.forEach((item) => {
        const listItem = document.createElement("li");

        Object.assign(listItem.style, {
          marginBottom: "4px",
          overflowWrap: "anywhere",
        });

        if (typeof item === "object" && item !== null) {
          renderValue(listItem, "Details", item, depth + 1);
        } else {
          listItem.textContent = String(item);
        }

        list.append(listItem);
      });

      wrapper.append(list);
    }

    // -------------------------------------------
    // SIMPLE VALUES
    // -------------------------------------------
    else {
      const row = document.createElement("div");

      Object.assign(row.style, {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
        padding: "3px 0",
      });

      const label = document.createElement("span");

      label.textContent = `${formatLabel(key)}:`;

      Object.assign(label.style, {
        fontWeight: "600",
        color: "#64748B",
        flex: "1",
        minWidth: "0",
      });

      const result = document.createElement("span");

      if (typeof value === "boolean") {
        result.textContent = value ? "Yes" : "No";
      } else {
        result.textContent = String(value);
      }

      Object.assign(result.style, {
        fontWeight: "600",
        color: "#263A31",
        textAlign: "right",
        flex: "1.2",
        minWidth: "0",
        overflowWrap: "anywhere",
      });

      row.append(label, result);
      wrapper.append(row);
    }

    parent.append(wrapper);
  };

  // ---------------------------------------------
  // RENDER EVERY FIELD FROM THE ZONE DATA
  // ---------------------------------------------

  Object.entries(zone).forEach(([key, value]) => {
    renderValue(content, key, value);
  });

  return content;
};

// ---------------------------------------------
// FOREST MAP COMPONENT
// ---------------------------------------------

const ForestMap = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const mapElementRef = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<L.Map | null>(null);

  const layersRef = useRef<
    Partial<Record<Classification | "RED_DEMO", L.LayerGroup>>
  >({});

  const [visible, setVisible] = useState<
    Record<Classification | "RED_DEMO", boolean>
  >({
    RED: true,
    YELLOW: true,
    GREEN: true,
    GREY: true,
    RED_DEMO: true,
  });

  const visibleRef = useRef(visible);

  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // ---------------------------------------------
  // INITIALIZE MAP AND LOAD DATA
  // ---------------------------------------------

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapElementRef.current, {
      zoomControl: true,
      preferCanvas: true,
    });

    mapRef.current = map;

    // Satellite basemap
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19,
      },
    ).addTo(map);

    map.fitBounds(aoiBounds, {
      padding: [18, 18],
    });

    let cancelled = false;

    Promise.all([loadBlockFeatures(), loadRedDemoOverlay()])
      .then(([blockData, demoData]) => {
        if (cancelled) return;

        const renderer = L.canvas({
          padding: 0.5,
        });

        // ---------------------------------------
        // CLASSIFICATION LAYERS
        // ---------------------------------------

        for (const classification of classes) {
          const group = L.layerGroup();

          blockData.features.forEach((feature) => {
            if (feature.properties.classification !== classification) {
              return;
            }

            const color =
              feature.properties.color || colorByClass[classification];

            const polygon = L.geoJSON(feature as unknown as GeoJSON.Feature, {
              style: {
                renderer,
                color,
                fillColor: color,
                fillOpacity: classification === "YELLOW" ? 0.88 : 0.76,
                weight: 0.55,
              },
            });

            polygon.eachLayer((path) => {
              if (!(path instanceof L.Polygon)) {
                return;
              }

              path.bindTooltip("", {
                sticky: true,
                direction: "top",
                opacity: 0.95,
              });

              path.on("mouseover", (event: L.LeafletMouseEvent) => {
                path.setTooltipContent(coordinatesLabel(event.latlng));

                path.openTooltip(event.latlng);
              });

              path.on("mousemove", (event: L.LeafletMouseEvent) => {
                path.setTooltipContent(coordinatesLabel(event.latlng));
              });
            });

            group.addLayer(polygon);
          });

          layersRef.current[classification] = group;

          if (visibleRef.current[classification]) {
            group.addTo(map);
          }
        }

        // ---------------------------------------
        // RED DEMONSTRATION DATA VALIDATION
        // ---------------------------------------

        if (
          demoData.features.length !== 2 ||
          redDemoDetails.zones.length !== 2
        ) {
          throw new Error(
            "The RED demonstration map expects exactly two source features and two matching detail records.",
          );
        }

        // ---------------------------------------
        // RED DEMONSTRATION LAYER
        // ---------------------------------------

        const demoGroup = L.layerGroup();

        demoData.features.forEach((feature) => {
          const properties = feature.properties;

          const demoId = String(properties.demo_id);

          const polygon = L.geoJSON(feature as unknown as GeoJSON.Feature, {
            style: {
              renderer,
              color: colorByClass.RED,
              fillColor: colorByClass.RED,
              fillOpacity: 0.78,
              weight: 2,
            },
          });

          // Full investigation popup
          polygon.bindPopup(createPossibleCausesPopup(demoId), {
            maxWidth: 430,
            minWidth: 300,
            maxHeight: 460,
            autoPan: true,
            closeButton: true,
          });

          demoGroup.addLayer(polygon);
        });

        layersRef.current.RED_DEMO = demoGroup;

        if (visibleRef.current.RED_DEMO) {
          demoGroup.addTo(map);
        }

        setLoading(false);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setDataError(
            error instanceof Error ? error.message : "Unable to load map data.",
          );

          setLoading(false);
        }
      });

    // ---------------------------------------------
    // CLEANUP
    // ---------------------------------------------

    return () => {
      cancelled = true;

      map.remove();

      mapRef.current = null;
      layersRef.current = {};
    };
  }, []);

  // ---------------------------------------------
  // TOGGLE MAP LAYERS
  // ---------------------------------------------

  const toggleLayer = (key: Classification | "RED_DEMO") => {
    const next = !visibleRef.current[key];

    visibleRef.current = {
      ...visibleRef.current,
      [key]: next,
    };

    setVisible(visibleRef.current);

    const group = layersRef.current[key];
    const map = mapRef.current;

    if (!group || !map) return;

    if (next) {
      group.addTo(map);
    } else {
      map.removeLayer(group);
    }
  };

  // ---------------------------------------------
  // THEME STYLES
  // ---------------------------------------------

  const panel = isDark
    ? "border-slate-700 bg-slate-950/90 text-slate-100"
    : "border-white/80 bg-white/95 text-[#263a31]";

  const secondary = isDark ? "text-slate-400" : "text-[#647568]";

  // ---------------------------------------------
  // UI
  // ---------------------------------------------

  return (
    <section
      className={`overflow-hidden rounded-2xl border shadow-lg ${
        isDark ? "border-slate-800 bg-[#111827]" : "border-[#dce6da] bg-white"
      }`}
    >
      {/* HEADER */}

      <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <div
            className={`mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.8px] ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            <Satellite size={14} />
            NISAR Classification Map
          </div>

          <h2
            className={
              isDark
                ? "font-heading text-lg font-bold text-slate-100"
                : "font-heading text-lg font-bold text-ink"
            }
          >
            {projectMetadata.study_area}
          </h2>

          <p className={`mt-1 text-xs ${secondary}`}>
            {Object.values(classificationBanners)
              .reduce((sum, item) => sum + item.count, 0)
              .toLocaleString()}{" "}
            analyzed 50 m blocks · NISAR {projectMetadata.datasets.NISAR.frame}
          </p>
        </div>

        <span
          className={`rounded-lg border px-3 py-2 text-[10px] font-bold ${panel}`}
        >
          EPSG:4326 · {projectMetadata.aoi.crs}
        </span>
      </header>

      {/* LAYER CONTROLS */}

      <div
        className={`border-y px-6 py-3 ${
          isDark
            ? "border-slate-800 bg-[#0B1220]/50"
            : "border-[#e1e9df] bg-[#f5f8f2]"
        }`}
      >
        <div
          className={`mb-2 flex items-center gap-2 text-xs font-semibold ${secondary}`}
        >
          <Layers3 size={15} />
          Hover GREEN/YELLOW for coordinates · click a RED demo area for full
          investigation details
        </div>

        <div className="flex flex-wrap gap-2">
          {classes.map((classification) => {
            const banner = classificationBanners[classification];

            const count = classificationCounts[classification];

            return (
              <button
                key={classification}
                type="button"
                onClick={() => toggleLayer(classification)}
                aria-pressed={visible[classification]}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${panel}`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: banner.color,
                  }}
                />

                {classification}

                <span className={secondary}>{count.toLocaleString()}</span>

                {visible[classification] ? (
                  <Eye size={13} />
                ) : (
                  <EyeOff size={13} />
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => toggleLayer("RED_DEMO")}
            aria-pressed={visible.RED_DEMO}
            className={`flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-xs ${panel}`}
          >
            <span className="h-2.5 w-2.5 rounded-sm bg-red-600" />
            RED demonstration areas ({redDemoDetails.zones.length})
            {visible.RED_DEMO ? <Eye size={13} /> : <EyeOff size={13} />}
          </button>
        </div>
      </div>

      {/* MAP */}

      <div
        className={`relative h-[min(70vh,620px)] min-h-[380px] w-full ${
          isDark ? "bg-[#0B1220]" : "bg-[#e8eee7]"
        }`}
      >
        <div ref={mapElementRef} className="z-0 h-full w-full" />

        {(loading || dataError) && (
          <div
            className={`pointer-events-none absolute left-4 top-4 z-[1000] rounded-lg border px-3 py-2 text-xs ${panel}`}
          >
            {loading ? "Loading classification layers..." : dataError}
          </div>
        )}

        <div
          className={`pointer-events-none absolute bottom-4 right-4 z-[1000] rounded-lg border px-3 py-2 text-[10px] shadow-lg ${panel}`}
        >
          Scroll to zoom
        </div>
      </div>

      {/* FOOTER */}

      <footer
        className={`flex items-start gap-3 border-t px-6 py-4 ${
          isDark
            ? "border-slate-800 bg-[#0B1220]/60"
            : "border-[#e1e9df] bg-[#f5f8f2]"
        }`}
      >
        <Info size={15} className={`mt-0.5 shrink-0 ${secondary}`} />

        <p className={`text-[10px] leading-relaxed ${secondary}`}>
          GREEN means no significant anomaly detected and does not prove forest
          health. YELLOW marks candidate anomalies for investigation. There are
          no RED blocks in the source classification; the two RED demonstration
          areas preserve their separate source geometries and are unconfirmed.{" "}
          {projectMetadata.spatial_resolution.geometry_source}.
        </p>
      </footer>
    </section>
  );
};

export default ForestMap;
