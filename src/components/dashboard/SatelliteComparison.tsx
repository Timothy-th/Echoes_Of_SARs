import { Satellite, MapPin, Info, Trees, Activity, ZoomIn } from "lucide-react";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import nisarBefore from "../../assets/image/before.jpg";
import nisarAfter from "../../assets/image/BeforeColor.jpg";

import { useTheme } from "../../context/ThemeProvider";

const SatelliteComparison = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    card: isDark
      ? "border-slate-800 bg-[#111827]"
      : "border-[#dce6da] bg-white",

    heading: isDark ? "text-slate-100" : "text-[#263a31]",
    body: isDark ? "text-slate-400" : "text-[#647568]",
    muted: isDark ? "text-slate-500" : "text-[#849286]",

    divider: isDark ? "border-slate-800" : "border-[#e1e9df]",

    innerCard: isDark
      ? "border-slate-800 bg-[#0B1220]"
      : "border-[#e1e9df] bg-[#f5f8f2]",

    mapOverlay: isDark
      ? "border-white/10 bg-[#111827]/90 text-white"
      : "border-white/30 bg-[#263a31]/90 text-white",

    footer: isDark ? "bg-[#0B1220]/50" : "bg-[#f5f8f2]",
  };

  return (
    <section
      className={`overflow-hidden rounded-2xl border shadow-lg transition-colors duration-300 ${colors.card} ${
        isDark ? "shadow-black/10" : "shadow-ink/5"
      }`}
    >
      {/* HEADER */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5 ${colors.divider}`}
      >
        <div>
          <div
            className={`mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.8px] ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            <Satellite size={14} />
            Forest Change Monitoring
          </div>

          <h2 className={`font-heading text-lg font-bold ${colors.heading}`}>
            Understanding Deforestation in Bago Yoma
          </h2>

          <p className={`mt-1 max-w-2xl text-xs leading-5 ${colors.muted}`}>
            Explore the forest landscape and the geographical area where
            potential forest loss and environmental changes are being monitored.
          </p>
        </div>

        <span className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-[10px] font-bold tracking-wide text-amber-500">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          DEMO PREVIEW
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* FOREST LANDSCAPE */}
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />

                <h3 className={`text-sm font-bold ${colors.heading}`}>
                  Forest Landscape
                </h3>
              </div>

              <span
                className={`text-[10px] font-semibold uppercase tracking-wider ${colors.muted}`}
              >
                Earlier Reference
              </span>
            </div>

            <div
              className={`group relative h-65 overflow-hidden rounded-xl border ${
                isDark
                  ? "border-slate-700/80 bg-slate-800"
                  : "border-[#dce6da] bg-[#e8eee7]"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=900"
                alt="Illustrative dense green forest landscape"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="forest-landscape-label inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111827]/85 px-3 py-2 text-[10px] font-bold tracking-wider backdrop-blur-sm">
                  <Trees size={13} className="text-emerald-400" />
                  FOREST LANDSCAPE
                </span>
              </div>
            </div>
          </div>

          {/* DEFORESTATION MONITORING */}
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <h3 className={`text-sm font-bold ${colors.heading}`}>
                  Deforestation Monitoring
                </h3>
              </div>

              <span
                className={`text-[10px] font-semibold uppercase tracking-wider ${colors.muted}`}
              >
                Central Bago Yoma
              </span>
            </div>

            {/* INTERACTIVE SATELLITE MAP */}
            <div
              className={`relative h-65 overflow-hidden rounded-xl border ${
                isDark
                  ? "border-slate-700/80 bg-slate-800"
                  : "border-[#dce6da] bg-[#e8eee7]"
              }`}
            >
              <MapContainer
                center={[18.45, 96.35]}
                zoom={9}
                minZoom={6}
                maxZoom={18}
                scrollWheelZoom={true}
                zoomControl={true}
                className="z-0 h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </MapContainer>

              {/* MAP LABEL */}
              <div
                className={`forest-landscape-label pointer-events-none absolute bottom-3 left-3 z-1000 flex items-center gap-2 rounded-lg border px-3 py-2 text-[10px] font-bold tracking-wider backdrop-blur-sm ${colors.mapOverlay}`}
              >
                <MapPin size={13} className="text-emerald-400" />
                CENTRAL BAGO YOMA
              </div>

              <div
                className={`forest-landscape-label pointer-events-none absolute right-3 top-3 z-1000 flex items-center gap-2 rounded-lg border px-3 py-2 text-[10px] font-medium backdrop-blur-sm ${colors.mapOverlay}`}
              >
                <ZoomIn size={13} className="text-emerald-400" />
                Scroll to zoom
              </div>
            </div>
          </div>

          {/* NISAR BEFORE */}
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />

                <h3 className={`text-sm font-bold ${colors.heading}`}>NISAR</h3>
              </div>

              <span
                className={`text-[10px] font-semibold uppercase tracking-wider ${colors.muted}`}
              >
                Before
              </span>
            </div>

            <div
              className={`group relative h-65 overflow-hidden rounded-xl border ${
                isDark
                  ? "border-slate-700/80 bg-slate-800"
                  : "border-[#dce6da] bg-[#e8eee7]"
              }`}
            >
              <img
                src={nisarBefore}
                alt="NISAR forest observation before the comparison period"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="forest-landscape-label inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111827]/85 px-3 py-2 text-[10px] font-bold tracking-wider backdrop-blur-sm">
                  <Trees size={13} className="text-emerald-400" />
                  FOREST LANDSCAPE
                </span>
              </div>
            </div>

            <div className={`mt-4 rounded-xl border p-4 ${colors.innerCard}`}>
              <div className="flex items-center gap-2">
                <Trees
                  size={16}
                  className={isDark ? "text-emerald-400" : "text-emerald-700"}
                />

                <h4 className={`text-xs font-bold ${colors.heading}`}>
                  Why Forests Matter
                </h4>
              </div>

              <p className={`mt-2 text-xs leading-6 ${colors.muted}`}>
                Forests support biodiversity, store carbon, regulate water
                cycles, protect soil, and provide important resources for
                surrounding communities.
              </p>
            </div>
          </div>

          {/* NISAR AFTER */}
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />

                <h3 className={`text-sm font-bold ${colors.heading}`}>NISAR</h3>
              </div>

              <span
                className={`text-[10px] font-semibold uppercase tracking-wider ${colors.muted}`}
              >
                After
              </span>
            </div>

            <div
              className={`group relative h-65 overflow-hidden rounded-xl border ${
                isDark
                  ? "border-slate-700/80 bg-slate-800"
                  : "border-[#dce6da] bg-[#e8eee7]"
              }`}
            >
              <img
                src={nisarAfter}
                alt="NISAR forest observation after the comparison period"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="forest-landscape-label inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111827]/85 px-3 py-2 text-[10px] font-bold tracking-wider backdrop-blur-sm">
                  <Trees size={13} className="text-emerald-400" />
                  FOREST LANDSCAPE
                </span>
              </div>
            </div>

            <div className={`mt-4 rounded-xl border p-4 ${colors.innerCard}`}>
              <div className="flex items-center gap-2">
                <Trees
                  size={16}
                  className={isDark ? "text-emerald-400" : "text-emerald-700"}
                />

                <h4 className={`text-xs font-bold ${colors.heading}`}>
                  Why Forests Matter
                </h4>
              </div>

              <p className={`mt-2 text-xs leading-6 ${colors.muted}`}>
                Forests support biodiversity, store carbon, regulate water
                cycles, protect soil, and provide important resources for
                surrounding communities.
              </p>
            </div>
          </div>
        </div>

        {/* DEFORESTATION INFORMATION */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-rose-500/15 bg-rose-500/5 p-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-rose-400" />

              <h4 className={`text-xs font-bold ${colors.heading}`}>
                Why Monitor Deforestation?
              </h4>
            </div>

            <p
              className={`mt-2 text-xs leading-6 ${
                isDark ? "text-slate-400" : "text-[#647568]"
              }`}
            >
              Forest loss can contribute to habitat destruction, biodiversity
              decline, increased carbon emissions, soil erosion, and changes in
              local water systems.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2">
              <Satellite size={16} className="text-emerald-400" />

              <h4 className={`text-xs font-bold ${colors.heading}`}>
                From Observation to Investigation
              </h4>
            </div>

            <p
              className={`mt-2 text-xs leading-6 ${
                isDark ? "text-slate-400" : "text-[#647568]"
              }`}
            >
              Radar and optical satellite data can provide complementary
              evidence for identifying potential changes. Further analysis and
              field verification are needed before confirming forest loss.
            </p>
          </div>
        </div>

        {/* SCIENTIFIC NOTE */}
        <div
          className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${colors.innerCard}`}
        >
          <Info
            size={17}
            className={`mt-0.5 shrink-0 ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          />

          <div>
            <p className={`text-xs font-semibold ${colors.body}`}>
              Current Monitoring Status
            </p>

            <p className={`mt-1 text-[11px] leading-relaxed ${colors.muted}`}>
              The satellite map currently provides geographical context only.
              Actual forest-change detection results and validated deforestation
              indicators are not yet displayed. The forest photograph is an
              illustrative reference, not a historical satellite image of the
              study area.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className={`flex items-center gap-2 border-t px-6 py-3 ${colors.divider} ${colors.footer}`}
      >
        <Activity size={13} className={`shrink-0 ${colors.muted}`} />

        <p className={`text-[10px] leading-relaxed ${colors.muted}`}>
          Study area: Central Bago Yoma, Myanmar · Satellite basemap imagery
          provided by Esri.
        </p>
      </div>
    </section>
  );
};

export default SatelliteComparison;
