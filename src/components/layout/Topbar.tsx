import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "../../context/ThemeProvider";

const Topbar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    header: isDark
      ? "border-slate-700/80 bg-[#111827]"
      : "border-slate-200 bg-white",
    muted: isDark ? "text-slate-500" : "text-slate-500",
    heading: isDark ? "text-slate-100" : "text-slate-800",
    control: isDark
      ? "border-slate-700 bg-[#0B1220] hover:bg-slate-800"
      : "border-slate-200 bg-slate-50 hover:bg-slate-100",
    controlText: isDark ? "text-slate-200" : "text-slate-700",
    icon: isDark ? "text-slate-400" : "text-slate-500",
    divider: isDark ? "border-slate-700" : "border-slate-200",
  };

  return (
    <header
      className={`sticky top-0 z-50 flex h-20.5 w-full shrink-0 items-center justify-between border-b px-8 shadow-sm transition-colors duration-300 ${colors.header}`}
    >
      {/* Left Section */}
      <div>
        <div
          className={`mb-1 flex items-center gap-2 text-[11px] ${colors.muted}`}
        >
          <span>Workspace</span>
          <span>/</span>
          <span className="font-semibold text-emerald-500">Overview</span>
        </div>

        <h2 className={`font-heading text-xl font-bold ${colors.heading}`}>
          Forest Overview
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Profile */}
        <div
          className={`ml-1 flex items-center gap-2 border-l pl-4 ${colors.divider}`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm font-bold text-emerald-500">
            BY
          </div>

          <div className="hidden xl:block">
            <p className={`text-xs font-bold ${colors.controlText}`}>
              Aetheron
            </p>
            <p className={`text-[10px] ${colors.muted}`}>Research Dashboard</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
