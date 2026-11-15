import { MapPin } from "lucide-react";
import ForestMap from "../components/dashboard/ForestMap";
import { useTheme } from "../context/ThemeProvider";
import { projectMetadata } from "../data/projectData";

const MonitoringMap = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="space-y-6">
      <section>
        <div
          className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
        >
          <MapPin size={15} />
          GEOSPATIAL MONITORING
        </div>
        <h1
          className={`mt-3 font-heading text-3xl font-extrabold ${isDark ? "text-slate-100" : "text-ink"}`}
        >
          Monitoring Map
        </h1>
        <p
          className={`mt-2 max-w-3xl text-sm leading-6 ${isDark ? "text-slate-400" : "text-[#647568]"}`}
        >
          Toggle the source NISAR classification layers across{" "}
          {projectMetadata.study_area}. Select a colored block to inspect its
          source attributes. RED demo markers are a separate optional layer.
        </p>
      </section>
      <ForestMap />
    </div>
  );
};
export default MonitoringMap;
