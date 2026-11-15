import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { MapPin, Satellite, Layers3, Info } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";

type MapStyle = "satellite";

const mapLayers: Record<
  MapStyle,
  {
    label: string;
    url: string;
    attribution: string;
  }
> = {
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
};

const ForestMap = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [mapStyle, setMapStyle] = useState<MapStyle>("satellite");
  const [clickMessage, setClickMessage] = useState(
    "Click inside the orange boundary to select a location.",
  );

  // PNG image location.
  // Put test.png inside your project's public folder.
  const pngUrl = "/test.png";

  // PNG geographic bounds.
  // Format: [[South-West], [North-East]]
  const rasterBounds = L.latLngBounds(
    [34.237256, -119.689694],
    [35.361633, -118.679124],
  );

  // MAP INITIALIZATION
  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      center: [34.8, -119.18],
      zoom: 9,
      minZoom: 6,
      maxZoom: 19,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    mapRef.current = map;

    // PNG overlay
    L.imageOverlay(pngUrl, rasterBounds, {
      opacity: 0.85,
      interactive: false,
    }).addTo(map);

    // Orange raster boundary
    L.rectangle(rasterBounds, {
      color: "#ff7800",
      weight: 2,
      dashArray: "5, 5",
      fillOpacity: 0.05,
    }).addTo(map);

    // Automatically fit the map to the raster
    map.fitBounds(rasterBounds, {
      padding: [20, 20],
    });

    // MAP CLICK VALIDATION
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const clickedLocation = e.latlng;

      const lat = clickedLocation.lat.toFixed(6);
      const lng = clickedLocation.lng.toFixed(6);

      if (rasterBounds.contains(clickedLocation)) {
        // Remove previous marker
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        // Add new marker
        markerRef.current = L.marker(clickedLocation).addTo(map);

        markerRef.current.bindPopup(`Lat: ${lat}<br>Lng: ${lng}`).openPopup();

        // Zoom toward selected location
        map.flyTo(clickedLocation, 10, {
          animate: true,
          duration: 2,
        });

        setClickMessage(`Selected location: ${lat}, ${lng}`);
      } else {
        setClickMessage(
          "Invalid location. Please select a point inside the orange boundary.",
        );
      }
    };

    map.on("click", handleMapClick);

    // CLEANUP
    return () => {
      map.off("click", handleMapClick);
      map.remove();

      mapRef.current = null;
      tileLayerRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // UPDATE BASE MAP WHEN SELECTOR CHANGES
  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    // Remove previous base layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    // Add selected base layer
    const selectedLayer = mapLayers[mapStyle];

    const newTileLayer = L.tileLayer(selectedLayer.url, {
      attribution: selectedLayer.attribution,
      maxZoom: 19,
    });

    newTileLayer.addTo(map);
    tileLayerRef.current = newTileLayer;

    // Keep PNG overlay and boundary above the base layer.
    // They remain on the map when the base style changes.
  }, [mapStyle]);

  const colors = {
    card: isDark
      ? "border-slate-800 bg-[#111827]"
      : "border-[#dce6da] bg-white",

    heading: isDark ? "text-slate-100" : "text-[#263a31]",
    body: isDark ? "text-slate-300" : "text-[#52665a]",
    muted: isDark ? "text-slate-500" : "text-[#849286]",

    divider: isDark ? "border-slate-800" : "border-[#e1e9df]",

    controls: isDark
      ? "border-slate-800 bg-[#0B1220]/50"
      : "border-[#e1e9df] bg-[#f5f8f2]",

    buttonGroup: isDark
      ? "border-slate-700/80 bg-[#111827]"
      : "border-[#dce6da] bg-white",

    inactiveButton: isDark
      ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
      : "text-[#647568] hover:bg-[#eef3eb] hover:text-[#263a31]",

    footer: isDark ? "bg-[#0B1220]/60" : "bg-[#f5f8f2]",

    mapBackground: isDark ? "bg-[#0B1220]" : "bg-[#e8eee7]",
  };

  return (
    <section
      className={`overflow-hidden rounded-2xl border shadow-lg transition-colors duration-300 ${colors.card} ${
        isDark ? "shadow-black/10" : "shadow-ink/5"
      }`}
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <div
            className={`mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.8px] ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            <MapPin size={14} />
            Geographic Monitoring
          </div>

          <h2 className={`font-heading text-lg font-bold ${colors.heading}`}>
            Central Bago Yoma
          </h2>

          <p className={`mt-1 text-xs ${colors.muted}`}>
            Satellite imagery and raster overlay visualization
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

          <span
            className={`text-[10px] font-bold tracking-wide ${
              isDark ? "text-amber-400" : "text-amber-700"
            }`}
          >
            LOCATION PREVIEW
          </span>
        </div>
      </div>

      {/* MAP CONTROLS */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-y px-6 py-3 ${colors.divider} ${colors.controls}`}
      >
        <div
          className={`flex items-center gap-2 text-xs font-semibold ${colors.body}`}
        >
          <Layers3
            size={15}
            className={isDark ? "text-emerald-400" : "text-emerald-700"}
          />
          Base Map
        </div>

        <div
          className={`flex flex-wrap items-center gap-1 rounded-xl border p-1 ${colors.buttonGroup}`}
        >
          {(Object.keys(mapLayers) as MapStyle[]).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setMapStyle(style)}
              aria-pressed={mapStyle === style}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                mapStyle === style
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/20"
                  : colors.inactiveButton
              }`}
            >
              {style === "satellite" && <Satellite size={14} />}

              {mapLayers[style].label}
            </button>
          ))}
        </div>
      </div>

      {/* MAP */}
      <div className={`relative h-95 w-full ${colors.mapBackground}`}>
        <div ref={mapElementRef} className="z-0 h-full w-full" />

        {/* ZOOM GUIDE */}
        <div
          className={`pointer-events-none absolute bottom-4 right-4 z-1000 rounded-lg border px-3 py-2 text-[10px] shadow-lg ${
            isDark
              ? "border-white/10 bg-[#0B1220]/85 text-slate-300"
              : "border-[#dce6da] bg-white/90 text-[#52665a]"
          }`}
        >
          Scroll to zoom
        </div>
      </div>

      {/* CLICK STATUS */}
      <div
        className={`flex items-start gap-3 border-t px-6 py-3 ${colors.divider} ${colors.controls}`}
      >
        <MapPin
          size={14}
          className={`mt-0.5 shrink-0 ${
            clickMessage.startsWith("Invalid")
              ? "text-rose-400"
              : "text-emerald-500"
          }`}
        />

        <p className={`text-[10px] leading-relaxed ${colors.muted}`}>
          {clickMessage}
        </p>
      </div>

      {/* MAP INFORMATION */}
      <div
        className={`flex items-start gap-3 border-t px-6 py-4 ${colors.divider} ${colors.footer}`}
      >
        <Info size={15} className={`mt-0.5 shrink-0 ${colors.muted}`} />

        <p className={`text-[10px] leading-relaxed ${colors.muted}`}>
          The PNG image is displayed as a geographic overlay using its assigned
          coordinates. The orange rectangle represents its raster boundary.
          Selected points are accepted only within this boundary.
        </p>
      </div>
    </section>
  );
};

export default ForestMap;
