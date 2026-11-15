import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Layers3,
  MapPin,
  Satellite,
} from "lucide-react";
import ForestChangeChart from "../components/dashboard/ForestChangeChart";
import ForestMap from "../components/dashboard/ForestMap";
import { useTheme } from "../context/ThemeProvider";
import {
  classificationBanners,
  classificationCounts,
  projectMetadata,
  totalBlocks,
} from "../data/projectData";

const Overview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cards: Array<{
    label: string;
    value: string;
    detail: string;
    color: string;
  }> = [
    {
      label: "Analyzed blocks",
      value: totalBlocks.toLocaleString(),
      detail: `${projectMetadata.spatial_resolution.analysis_block_size_m} m analysis blocks`,
      color: "#38BDF8",
    },
    {
      label: "GREEN",
      value: classificationCounts.GREEN.toLocaleString(),
      detail: classificationBanners.GREEN.message,
      color: classificationBanners.GREEN.color,
    },
    {
      label: "YELLOW",
      value: classificationCounts.YELLOW.toLocaleString(),
      detail: classificationBanners.YELLOW.message,
      color: classificationBanners.YELLOW.color,
    },
    {
      label: "RED",
      value: classificationCounts.RED.toLocaleString(),
      detail: "No RED classifications in source data",
      color: classificationBanners.RED.color,
    },
  ];
  const card = isDark
    ? "border-slate-800 bg-[#111827]"
    : "border-[#dce6da] bg-white";
  const heading = isDark ? "text-slate-100" : "text-[#263a31]";
  const muted = isDark ? "text-slate-400" : "text-[#647568]";
  const dates = projectMetadata.datasets.NISAR.used_observation_dates;

  return (
    <div className={`space-y-8 ${isDark ? "text-slate-100" : "text-ink"}`}>
      <section>
        <div
          className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
        >
          <Activity size={15} />
          FOREST MONITORING DASHBOARD
        </div>
        <h1 className={`mt-3 font-heading text-3xl font-extrabold ${heading}`}>
          {projectMetadata.project}
        </h1>
        <p className={`mt-2 max-w-3xl text-sm leading-6 ${muted}`}>
          {projectMetadata.study_area} · {projectMetadata.primary_sensor}{" "}
          {projectMetadata.datasets.NISAR.product},{" "}
          {projectMetadata.datasets.NISAR.track}, frame{" "}
          {projectMetadata.datasets.NISAR.frame}.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Layers3
            size={17}
            className={isDark ? "text-emerald-400" : "text-emerald-700"}
          />
          <h2 className={`font-heading text-base font-bold ${heading}`}>
            Classification indicators
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((item) => (
            <article
              key={item.label}
              className={`rounded-2xl border p-5 shadow-lg ${card}`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold ${muted}`}>{item.label}</p>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <p
                className={`mt-5 font-heading text-3xl font-extrabold ${heading}`}
              >
                {item.value}
              </p>
              <p className={`mt-2 text-[11px] leading-5 ${muted}`}>
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={`rounded-2xl border p-5 ${card}`}>
        <div className="flex items-start gap-3">
          <Satellite size={18} className="mt-0.5 text-emerald-500" />
          <div>
            <h2 className={`text-sm font-bold ${heading}`}>
              NISAR observation series
            </h2>
            <p className={`mt-1 text-xs ${muted}`}>
              Used dates: {dates.join(" · ")}
            </p>
            <p className={`mt-2 text-xs ${muted}`}>
              Polarization:{" "}
              {projectMetadata.datasets.NISAR.polarization.join(" / ")} · Source
              pixels: {projectMetadata.spatial_resolution.source_pixel_size_m} m
              · Analysis blocks:{" "}
              {projectMetadata.spatial_resolution.analysis_block_size_m} m
            </p>
          </div>
        </div>
        <div
          className={`mt-4 flex items-start gap-2 border-t pt-4 ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}
        >
          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <p className={`text-[11px] leading-5 ${muted}`}>
            {projectMetadata.scientific_limitations.join(" ")}
          </p>
        </div>
      </section>

      <ForestChangeChart />
      <ForestMap />
      <section
        className={`grid gap-3 rounded-2xl border p-5 md:grid-cols-3 ${card}`}
      >
        <div className="flex gap-2">
          <MapPin size={15} className="mt-0.5 text-emerald-500" />
          <p className={`text-xs ${muted}`}>
            AOI: {projectMetadata.aoi.bounds.west}–
            {projectMetadata.aoi.bounds.east}°E,{" "}
            {projectMetadata.aoi.bounds.south}–
            {projectMetadata.aoi.bounds.north}°N ({projectMetadata.aoi.crs})
          </p>
        </div>
        <div className="flex gap-2">
          <CheckCircle2 size={15} className="mt-0.5 text-emerald-500" />
          <p className={`text-xs ${muted}`}>
            Degradation confirmed:{" "}
            {projectMetadata.degradation_confirmed ? "Yes" : "No"}
          </p>
        </div>
        <div className="flex gap-2">
          <InfoIcon isDark={isDark} />
          <p className={`text-xs ${muted}`}>
            Coordinates in source GeoJSON are longitude, latitude. GeoTIFF CRS:{" "}
            {projectMetadata.coordinate_reference_systems.GeoTIFF}.
          </p>
        </div>
      </section>
    </div>
  );
};

const InfoIcon = ({ isDark }: { isDark: boolean }) => (
  <Activity
    size={15}
    className={`mt-0.5 ${isDark ? "text-slate-400" : "text-[#647568]"}`}
  />
);

export default Overview;
