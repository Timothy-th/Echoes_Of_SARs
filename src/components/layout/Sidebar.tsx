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

const Sidebar = () => {
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
      className={`sticky top-0 flex h-screen w-65 shrink-0 flex-col border-r px-5 py-6 transition-colors duration-300 ${colors.sidebar}`}
    >
      {/* Project Logo */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-1.5 shadow-md ${
            isDark
              ? "border-white/10 shadow-black/20"
              : "border-slate-200 shadow-slate-200/50"
          }`}
        >
          <img
            src={logo}
            alt="Echoes of SARs logo"
            className="block h-full w-full object-contain object-center"
          />
        </div>

        <div className="min-w-0">
          <h1 className="font-heading text-lg font-extrabold tracking-tight text-emerald-500">
            Echoes of SARs
          </h1>

          <p
            className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[1.8px] ${colors.heading}`}
          >
            Forest Intelligence
          </p>
        </div>
      </div>

      {/* Navigation Heading */}
      <div
        className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[1.8px] ${colors.heading}`}
      >
        Monitoring Workspace
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl border px-3 py-3 text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : `border-transparent ${colors.inactive}`
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Project Information */}
      <div
        className={`rounded-2xl border p-4 transition-colors duration-300 ${colors.infoCard}`}
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
        className={`mt-4 flex items-center justify-between rounded-xl px-3 py-3 text-xs font-semibold transition ${colors.link}`}
      >
        <span>Visit Public Website</span>
        <ArrowUpRight size={16} />
      </Link>

      {/* Copyright */}
      <div className={`mt-3 text-center text-[10px] ${colors.copyright}`}>
        NASA Space Apps Challenge 2026
      </div>
    </aside>
  );
};

export default Sidebar;
