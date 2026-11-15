import { Info, ChartNoAxesColumn } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import { classificationBanners, classificationCounts, totalBlocks, type Classification } from "../../data/projectData";

const groups: Classification[] = ["GREEN", "YELLOW", "RED", "GREY"];

const ForestChangeChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const heading = isDark ? "text-slate-100" : "text-[#263a31]";
  const muted = isDark ? "text-slate-400" : "text-[#647568]";
  return (
    <section className={`overflow-hidden rounded-2xl border shadow-lg ${isDark ? "border-slate-800 bg-[#111827]" : "border-[#dce6da] bg-white"}`}>
      <div className={`border-b px-6 py-5 ${isDark ? "border-slate-800" : "border-[#e1e9df]"}`}>
        <div className={`mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.8px] ${isDark ? "text-emerald-400" : "text-emerald-700"}`}><ChartNoAxesColumn size={14} />Classification Summary</div>
        <h2 className={`font-heading text-lg font-bold ${heading}`}>NISAR classified blocks</h2>
        <p className={`mt-1 text-xs ${muted}`}>{totalBlocks.toLocaleString()} blocks in the supplied classification GeoJSON</p>
      </div>
      <div className="space-y-5 p-6">
        {groups.map((classification) => {
          const count = classificationCounts[classification];
          const pct = totalBlocks ? (count / totalBlocks) * 100 : 0;
          return <div key={classification}>
            <div className="mb-2 flex items-center justify-between gap-4 text-xs">
              <span className={`flex items-center gap-2 font-semibold ${heading}`}><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: classificationBanners[classification].color }} />{classification}</span>
              <span className={muted}>{count.toLocaleString()} blocks · {pct.toFixed(2)}%</span>
            </div>
            <div className={`h-3 overflow-hidden rounded-full ${isDark ? "bg-slate-800" : "bg-[#e7eee4]"}`}><div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: classificationBanners[classification].color, minWidth: count ? 3 : 0 }} /></div>
            <p className={`mt-1 text-[10px] ${muted}`}>{classificationBanners[classification].message}</p>
          </div>;
        })}
      </div>
      <div className={`flex items-start gap-2 border-t px-6 py-4 ${isDark ? "border-slate-800 bg-[#0B1220]/50" : "border-[#e1e9df] bg-[#f5f8f2]"}`}>
        <Info size={14} className={`mt-0.5 shrink-0 ${muted}`} />
        <p className={`text-[10px] leading-relaxed ${muted}`}>The source classification includes no RED or GREY blocks. The separate red demo overlay is excluded from these totals.</p>
      </div>
    </section>
  );
};
export default ForestChangeChart;
