import { Activity, CalendarDays, Database, Info, Satellite } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { ndmiMetadata, projectMetadata } from "../data/projectData";
import NDVIComparisonMap from "../components/dashboard/NDVIComparisonMap";

const ndmiPreview = new URL("../../data/ndmi_change.png", import.meta.url).href;
const Analytics = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const panel = isDark ? "border-slate-800 bg-[#111827]" : "border-[#dce6da] bg-white";
  const heading = isDark ? "text-slate-100" : "text-[#263a31]";
  const muted = isDark ? "text-slate-400" : "text-[#647568]";
  const datasets = Object.entries(projectMetadata.datasets);
  return <div className={`space-y-8 ${isDark ? "text-slate-100" : "text-ink"}`}>
    <section><div className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${isDark ? "text-emerald-400" : "text-emerald-700"}`}><Activity size={15}/>DATA ANALYSIS</div><h1 className={`mt-3 font-heading text-3xl font-extrabold ${heading}`}>Forest Analytics</h1><p className={`mt-2 max-w-3xl text-sm leading-6 ${muted}`}>Measurements and provenance available in the project data folder. NISAR supplies the classification; the NDMI raster is shown with its source metadata.</p></section>

    <section className={`overflow-hidden rounded-2xl border ${panel}`}>
      <div className={`border-b p-6 ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}><div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500"><Satellite size={20}/></div><div><h2 className={`font-heading text-base font-bold ${heading}`}>NISAR observation configuration</h2><p className={`mt-1 text-xs ${muted}`}>{projectMetadata.datasets.NISAR.product} · {projectMetadata.datasets.NISAR.frequency} · track {projectMetadata.datasets.NISAR.track} · frame {projectMetadata.datasets.NISAR.frame}</p></div></div></div>
      <div className="grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-5">{projectMetadata.datasets.NISAR.used_observation_dates.map((date) => <div key={date} className={`rounded-xl border p-4 ${isDark ? "border-slate-700 bg-[#0B1220]" : "border-[#e1e9df] bg-[#f8faf6]"}`}><CalendarDays size={15} className="mb-2 text-emerald-500"/><p className={`text-sm font-bold ${heading}`}>{date}</p><p className={`mt-1 text-[10px] ${muted}`}>NISAR observation used</p></div>)}</div>
      <div className={`border-t px-6 py-4 ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}><p className={`text-xs ${muted}`}>Polarization: {projectMetadata.datasets.NISAR.polarization.join(" / ")} · Source pixel: {projectMetadata.datasets.NISAR.source_resolution_m} m · Analysis block: {projectMetadata.datasets.NISAR.analysis_block_size_m} m</p>{projectMetadata.datasets.NISAR.excluded_observations.map((item) => <p key={item.date} className={`mt-2 text-[11px] ${muted}`}>Excluded {item.date}: {item.reason}</p>)}</div>
    </section>

    <NDVIComparisonMap />

    <section className={`overflow-hidden rounded-2xl border ${panel}`}>
      <div className={`border-b p-6 ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}><div className="flex items-center gap-3"><Database size={19} className="text-cyan-500"/><div><h2 className={`font-heading text-base font-bold ${heading}`}>{ndmiMetadata.index} change raster</h2><p className={`mt-1 text-xs ${muted}`}>{ndmiMetadata.source}</p></div></div></div>
      <div className="grid gap-5 p-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className={`overflow-hidden rounded-xl border ${isDark ? "border-slate-700 bg-[#0B1220]" : "border-[#e1e9df] bg-[#f5f8f2]"}`}><img src={ndmiPreview} alt="NDMI change raster over the study area" className="h-full max-h-[460px] min-h-[260px] w-full object-contain"/></div>
        <div><h3 className={`mb-3 text-sm font-bold ${heading}`}>Raster metadata</h3><dl className={`space-y-2 text-xs ${muted}`}>
          <Meta label="Dimensions" value={`${ndmiMetadata.width} × ${ndmiMetadata.height} cells`}/><Meta label="CRS" value={ndmiMetadata.crs}/><Meta label="Valid cells" value={ndmiMetadata.valid_cells.toLocaleString()}/><Meta label="Minimum" value={ndmiMetadata.statistics.min.toFixed(4)}/><Meta label="Maximum" value={ndmiMetadata.statistics.max.toFixed(4)}/><Meta label="Mean" value={ndmiMetadata.statistics.mean.toFixed(4)}/><Meta label="Display range" value={ndmiMetadata.display_range.join(" to ")}/><Meta label="NoData" value={ndmiMetadata.nodata.toExponential(3)}/><Meta label="Bounds" value={ndmiMetadata.bounds.map((value) => value.toFixed(6)).join(", ")}/><Meta label="Affine transform" value={ndmiMetadata.transform.map((value) => value.toPrecision(5)).join(", ")}/>
        </dl></div>
      </div>
    </section>

    <section className={`rounded-2xl border p-6 ${panel}`}><h2 className={`mb-4 font-heading text-base font-bold ${heading}`}>Supporting dataset availability</h2><div className="grid gap-4 md:grid-cols-2">{datasets.map(([name, dataset]) => <article key={name} className={`rounded-xl border p-4 ${isDark ? "border-slate-700 bg-[#0B1220]" : "border-[#e1e9df] bg-[#f8faf6]"}`}><h3 className={`text-sm font-bold ${heading}`}>{name} · {dataset.status}</h3><dl className={`mt-3 space-y-2 text-[11px] ${muted}`}>{Object.entries(dataset).filter(([key]) => key !== "status").map(([key, value]) => <div key={key}><dt className="font-semibold">{key.replaceAll("_", " ")}</dt><dd className="ml-2 break-words">{Array.isArray(value) ? value.map((entry) => typeof entry === "object" ? JSON.stringify(entry) : String(entry)).join(" · ") : typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)}</dd></div>)}</dl></article>)}</div>
      <div className={`mt-5 flex gap-2 border-t pt-4 text-[11px] leading-5 ${isDark ? "border-slate-800 text-slate-400" : "border-[#e1e9df] text-[#647568]"}`}><Info size={15} className="mt-0.5 shrink-0"/>{projectMetadata.classification_method.basis}. RED requires independent evidence; none is supported in the supplied project metadata. SMAP and GEDI limitations are shown above and are not interpreted as measurements.</div>
    </section>
  </div>;
};

const Meta = ({ label, value }: { label: string; value: string }) => <div className="flex flex-col border-b border-current/10 pb-2"><dt className="font-semibold">{label}</dt><dd className="mt-0.5 break-words">{value}</dd></div>;
export default Analytics;
