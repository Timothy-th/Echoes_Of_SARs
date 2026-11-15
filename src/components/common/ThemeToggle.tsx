import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
        isDark
          ? "border-slate-700 bg-slate-800 text-yellow-300 hover:bg-slate-700"
          : "border-forest/15 bg-white text-forest hover:bg-forest/5"
      } ${className}`}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={2} />
      ) : (
        <Moon size={18} strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;
