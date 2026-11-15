import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "../../context/ThemeProvider";

import logo from "../../assets/image/Echoes of SARs Nature-Satellite Logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Stories", path: "/stories" },
  { name: "Forest Knowledge", path: "/education" },
  { name: "Take Action", path: "/take-action" },
  { name: "About Us", path: "/about" },
];

const PublicNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    header: isDark
      ? "border-slate-700/70 bg-[#0B1220]/95"
      : "border-forest/10 bg-cream/95",

    title: isDark ? "text-slate-100" : "text-forest-dark",

    nav: isDark
      ? "text-slate-300 hover:text-emerald-400"
      : "text-ink/70 hover:text-forest",

    activeNav: isDark ? "text-emerald-400" : "text-forest",

    action: isDark
      ? "bg-emerald-500 text-[#0B1220] hover:bg-emerald-400"
      : "bg-forest text-white! hover:bg-forest-dark",

    menuButton: isDark
      ? "border-slate-700 text-slate-200 hover:bg-slate-800"
      : "border-forest/15 text-forest hover:bg-forest/5",

    mobileMenu: isDark
      ? "border-slate-700 bg-[#111827]"
      : "border-forest/10 bg-cream",

    mobileActive: isDark
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-sage-light text-forest",

    mobileInactive: isDark
      ? "text-slate-300 hover:bg-slate-800"
      : "text-ink hover:bg-paper",
  };

  return (
    <header
      className={`sticky top-0 z-1000 border-b backdrop-blur-md transition-colors duration-300 ${colors.header}`}
    >
      <nav className="section-container flex h-19 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <img
              src={logo}
              alt="Echoes of SARs logo"
              className="block h-full w-full object-contain object-center"
            />
          </div>

          <div className="leading-tight">
            <span
              className={`block font-heading text-lg font-extrabold tracking-tight transition-colors ${colors.title}`}
            >
              Echoes of SARs
            </span>

            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">
              Forest Watch & Conservation
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative py-2 text-[13px] font-semibold transition-colors ${
                  isActive ? colors.activeNav : colors.nav
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-emerald-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/monitor"
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition-colors duration-300 ${colors.action}`}
          >
            Explore Monitor
            <ArrowUpRight size={15} />
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${colors.menuButton}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          className={`border-t px-6 pb-6 pt-4 transition-colors duration-300 lg:hidden ${colors.mobileMenu}`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive ? colors.mobileActive : colors.mobileInactive
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/monitor"
              onClick={() => setMenuOpen(false)}
              className={`mt-3 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors ${colors.action}`}
            >
              Explore Monitor
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
