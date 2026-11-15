import { AlertTriangle, ClipboardList, MapPin, ScanSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { classificationBanners, classificationCounts, loadBlockFeatures, projectMetadata, redDemoDetails, totalBlocks, type PolygonFeature } from "../data/projectData";

const JsonFields = ({ value }: { value: unknown }) => {
  if (value === null || typeof value !== "object") return <span>{String(value)}</span>;
  if (Array.isArray(value)) return <ul className="ml-4 list-disc space-y-1">{value.map((item, index) => <li key={index}><JsonFields value={item} /></li>)}</ul>;
  return <dl className="space-y-2">{Object.entries(value as Record<string, unknown>).map(([key, item]) => <div key={key}><dt className="font-semibold">{key.replaceAll("_", " ")}</dt><dd className="ml-3 break-words opacity-80"><JsonFields value={item} /></dd></div>)}</dl>;
};

const ChangeDetection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const panel = isDark ? "border-slate-800 bg-[#111827]" : "border-[#dce6da] bg-white";
  const heading = isDark ? "text-slate-100" : "text-[#263a31]";
  const muted = isDark ? "text-slate-400" : "text-[#647568]";
  const [yellowBlocks, setYellowBlocks] = useState<PolygonFeature[]>([]);
  const [blocksLoading, setBlocksLoading] = useState(true);
  useEffect(() => {
    let active = true;
    loadBlockFeatures().then((data) => {
      if (active) setYellowBlocks(data.features.filter((feature) => feature.properties.classification === "YELLOW"));
    }).finally(() => { if (active) setBlocksLoading(false); });
    return () => { active = false; };
  }, []);
  return <div className={`space-y-8 ${isDark ? "text-slate-100" : "text-ink"}`}>
    <section><div className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${isDark ? "text-emerald-400" : "text-emerald-700"}`}><ScanSearch size={15}/>CLASSIFICATION REVIEW</div><h1 className={`mt-3 font-heading text-3xl font-extrabold ${heading}`}>Change Detection</h1><p className={`mt-2 max-w-3xl text-sm leading-6 ${muted}`}>NISAR temporal anomaly classifications for {projectMetadata.study_area}. Candidate anomaly classes require investigation; they are not confirmed deforestation.</p></section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{(["GREEN", "YELLOW", "RED", "GREY"] as const).map((classification) => <article key={classification} className={`rounded-2xl border p-5 ${panel}`}><p className={`flex items-center gap-2 text-xs font-semibold ${muted}`}><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: classificationBanners[classification].color }}/>{classification}</p><p className={`mt-4 text-3xl font-extrabold ${heading}`}>{classificationCounts[classification].toLocaleString()}</p><p className={`mt-2 text-[11px] leading-5 ${muted}`}>{classificationBanners[classification].message}</p></article>)}</section>

    <section className={`overflow-hidden rounded-2xl border ${panel}`}>
      <div className={`border-b p-6 ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}><h2 className={`font-heading text-base font-bold ${heading}`}>YELLOW candidate blocks</h2><p className={`mt-1 text-xs ${muted}`}>{blocksLoading ? "Loading block attributes…" : `${yellowBlocks.length} block records from the source GeoJSON`} · select the Monitoring Map for their locations</p></div>
      <div className="max-h-[600px] overflow-auto"><table className="w-full min-w-[680px] text-left text-xs"><thead className={`sticky top-0 ${isDark ? "bg-slate-900 text-slate-300" : "bg-[#f5f8f2] text-[#52665a]"}`}><tr>{["Block ID", "Row", "Column", "Area (ha)", "Zone ID", "Clickable", "Geometry source"].map((name) => <th key={name} className="px-4 py-3 font-semibold">{name}</th>)}</tr></thead><tbody>{yellowBlocks.map(({ properties }) => <tr key={properties.block_id} className={`border-t ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}><td className={`px-4 py-3 font-medium ${heading}`}>{properties.block_id}</td><td className={`px-4 py-3 ${muted}`}>{properties.block_row}</td><td className={`px-4 py-3 ${muted}`}>{properties.block_col}</td><td className={`px-4 py-3 ${muted}`}>{properties.area_ha}</td><td className={`px-4 py-3 ${muted}`}>{properties.zone_id ?? "—"}</td><td className={`px-4 py-3 ${muted}`}>{String(properties.clickable)}</td><td className={`px-4 py-3 ${muted}`}>{properties.geometry_source}</td></tr>)}</tbody></table></div>
    </section>

    <section className={`rounded-2xl border p-6 ${panel}`}>
      <div className="flex items-start gap-3"><AlertTriangle size={19} className="mt-0.5 shrink-0 text-red-500"/><div><h2 className={`font-heading text-base font-bold ${heading}`}>Separate RED demonstration examples</h2><p className={`mt-1 text-xs leading-5 ${muted}`}>{redDemoDetails.warning} These two demo zones are excluded from the {totalBlocks.toLocaleString()} source classifications. The source classification has {projectMetadata.classification_counts.RED} RED blocks; degradation confirmed: {String(projectMetadata.degradation_confirmed)}.</p></div></div>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">{redDemoDetails.zones.map((zone) => <details key={zone.demo_id} className={`rounded-xl border p-4 ${isDark ? "border-slate-700 bg-[#0B1220]" : "border-[#e1e9df] bg-[#f8faf6]"}`}><summary className={`cursor-pointer text-sm font-semibold ${heading}`}><MapPin size={14} className="mr-2 inline text-red-500"/>{zone.demo_id} · {zone.source_zone_id} · {zone.area_ha} ha</summary><div className={`mt-4 text-[11px] leading-5 ${muted}`}><div className="mb-3 flex items-center gap-2"><ClipboardList size={14}/>All supplied investigation and evidence fields</div><JsonFields value={zone}/></div></details>)}</div>
    </section>
  </div>;
};
export default ChangeDetection;
