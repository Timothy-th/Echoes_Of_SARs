import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  ScanSearch,
  Radar,
  Database,
  Leaf,
  ArrowUpRight,
} from "lucide-react";

import { useTheme } from "../../context/ThemeProvider";
import logo from "../../assets/image/Echoes of SARs Nature-Satellite Logo.png";

type SidebarProps = {
  onNavigate?: () => void;
};

const navigation = [
  {
    label: "Forest Overview",
    path: "/monitor",
    icon: LayoutDashboard,
  },
  {
    label: "Monitoring Map",
    path: "/map",
    icon: Map,
  },
  {
    label: "Forest Change",
    path: "/detection",
    icon: ScanSearch,
  },
  {
    label: "Forest Health",
    path: "/analytics",
    icon: Radar,
  },
  {
    label: "Data Sources",
    path: "/sources",
    icon: Database,
  },
];

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    sidebar: isDark
      ? "border-slate-700/60 bg-[#111827]"
      : "border-slate-200 bg-white",

    heading: isDark ? "text-slate-500" : "text-slate-400",

    inactive: isDark
      ? "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
      : "text-slate-600 hover:bg-slate-100 hover:text-emerald-700",

    infoCard: isDark
      ? "border-slate-700/70 bg-[#0B1220]"
      : "border-slate-200 bg-slate-50",

    description: isDark ? "text-slate-400" : "text-slate-600",

    divider: isDark ? "border-slate-700/70" : "border-slate-200",

    link: isDark
      ? "text-slate-400 hover:bg-slate-800 hover:text-emerald-400"
      : "text-slate-600 hover:bg-slate-100 hover:text-emerald-700",

    copyright: isDark ? "text-slate-600" : "text-slate-400",
  };

  return (
    <aside
      className={`flex h-full min-h-0 w-64 shrink-0 flex-col overflow-y-auto border-r px-4 py-5 sm:px-5 sm:py-6 transition-colors duration-300 ${colors.sidebar}`}
    >
      {/* Project Logo */}
      <div className="mb-8 flex shrink-0 items-center gap-3 px-2 sm:mb-10">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-1.5 shadow-md ${
            isDark
              ? "border-white/10 shadow-black/20"
              : "border-slate-200 shadow-slate-200/50"
          }`}
        >
          <img
            src={logo}
            alt="Echoes of SARs logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <h1 className="font-heading text-base font-extrabold tracking-tight text-emerald-500 sm:text-lg">
            Echoes of SARs
          </h1>

          <p
            className={`mt-0.5 text-[9px] font-semibold uppercase tracking-[1.5px] ${colors.heading}`}
          >
            Forest Intelligence
          </p>
        </div>
      </div>

      {/* Navigation Heading */}
      <div
        className={`mb-3 shrink-0 px-3 text-[10px] font-bold uppercase tracking-[1.8px] ${colors.heading}`}
      >
        Monitoring Workspace
      </div>

      {/* Navigation */}
      <nav className="flex shrink-0 flex-col gap-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex min-w-0 items-center gap-3 rounded-xl border px-3 py-3 text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 shadow-sm dark:text-emerald-400"
                    : `border-transparent ${colors.inactive}`
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    className="shrink-0"
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  <span className="min-w-0 flex-1 truncate">{item.label}</span>

                  {isActive && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Project Information */}
      <div
        className={`mt-auto shrink-0 rounded-2xl border p-4 transition-colors duration-300 ${colors.infoCard} ${"mt-8"}`}
      >
        <div className="mb-3 flex items-center gap-2 text-emerald-500">
          <Leaf size={17} />
          <span className="text-xs font-bold">Protect Our Forests</span>
        </div>

        <p className={`text-[11px] leading-relaxed ${colors.description}`}>
          Transforming satellite observations into meaningful information for
          forest conservation.
        </p>

        <div className={`mt-4 border-t pt-3 ${colors.divider}`}>
          <p
            className={`text-[10px] font-semibold leading-relaxed ${colors.heading}`}
          >
            Observation
            <span className="mx-1.5 text-emerald-500">→</span>
            Investigation
            <span className="mx-1.5 text-emerald-500">→</span>
            Action
          </p>
        </div>
      </div>

      {/* Public Website Link */}
      <Link
        to="/"
        onClick={onNavigate}
        className={`mt-4 flex shrink-0 items-center justify-between rounded-xl px-3 py-3 text-xs font-semibold transition ${colors.link}`}
      >
        <span>Visit Public Website</span>
        <ArrowUpRight size={16} />
      </Link>

      {/* Copyright */}
      <div
        className={`mt-3 shrink-0 pb-1 text-center text-[10px] ${colors.copyright}`}
      >
        NASA Space Apps Challenge 2026
      </div>
    </aside>
  );
};

export default Sidebar;
