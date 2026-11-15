import { useState } from "react";
import { MapPin, Layers, Info } from "lucide-react";

import ForestMap from "../components/dashboard/ForestMap";
import { useTheme } from "../context/ThemeProvider";

type DegradationLevel = {
  id: "high" | "moderate" | "low";
  label: string;
  description: string;
  color: string;
  dot: string;
};

const degradationLevels: DegradationLevel[] = [
  {
    id: "high",
    label: "High Priority",
    description: "Red",
    color: "#FB7185",
    dot: "bg-rose-400",
  },
  {
    id: "moderate",
    label: "Moderate Priority",
    description: "Yellow",
    color: "#FACC15",
    dot: "bg-yellow-400",
  },
  {
    id: "low",
    label: "Low Priority",
    description: "Green",
    color: "#4ADE80",
    dot: "bg-green-400",
  },
];

const MonitoringMap = () => {
  const [selectedLevel, setSelectedLevel] = useState<
    DegradationLevel["id"] | null
  >(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const visibleLevels = selectedLevel
    ? degradationLevels.filter((level) => level.id === selectedLevel)
    : degradationLevels;

  const handleLevelClick = (level: DegradationLevel["id"]) => {
    setSelectedLevel((current) => (current === level ? null : level));
  };

  const colors = {
    heading: isDark ? "text-slate-100" : "text-[#263a31]",
    body: isDark ? "text-slate-400" : "text-[#647568]",
    muted: isDark ? "text-slate-500" : "text-[#849286]",

    card: isDark
      ? "border-[#334155] bg-[#111827]"
      : "border-[#dce6da] bg-white",

    cardShadow: isDark ? "shadow-black/10" : "shadow-[#263a31]/5",

    selected: isDark
      ? "border-slate-500 bg-slate-800"
      : "border-[#8eaf8c] bg-[#eaf2e7]",

    unselected: isDark
      ? "border-slate-700/70 bg-[#0B1220] hover:border-slate-500 hover:bg-slate-800/70"
      : "border-[#dce6da] bg-[#f8faf6] hover:border-[#a8c5a5] hover:bg-[#eef4eb]",

    buttonText: isDark
      ? "text-emerald-400 hover:text-emerald-300"
      : "text-emerald-700 hover:text-emerald-900",

    divider: isDark ? "border-slate-800" : "border-[#e1e9df]",

    infoIcon: isDark ? "text-cyan-400" : "text-cyan-700",
  };

  return (
    <div
      className={`space-y-6 transition-colors duration-300 ${
        isDark ? "text-slate-100" : "text-ink"
      }`}
    >
      {/* PAGE HEADING */}
      <section>
        <div
          className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${
            isDark ? "text-emerald-400" : "text-emerald-700"
          }`}
        >
          <MapPin size={15} />
          GEOSPATIAL MONITORING
        </div>

        <h1
          className={`mt-3 font-heading text-3xl font-extrabold ${colors.heading}`}
        >
          Monitoring Map
        </h1>

        <p className={`mt-2 max-w-2xl text-sm leading-6 ${colors.body}`}>
          Explore the Central Bago Yoma study area through satellite imagery.
          Forest degradation monitoring layers will be added when verified
          geospatial data becomes available.
        </p>
      </section>

      {/* MAIN MAP */}
      <section>
        <ForestMap />
      </section>

      {/* FOREST DEGRADATION LEGEND */}
      <section
        className={`rounded-2xl border p-5 shadow-lg transition-colors duration-300 ${colors.card} ${colors.cardShadow}`}
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers
              size={18}
              className={isDark ? "text-emerald-400" : "text-emerald-700"}
            />

            <div>
              <h2
                className={`font-heading text-sm font-bold ${colors.heading}`}
              >
                Forest Degradation Legend
              </h2>

              <p className={`mt-1 text-[11px] ${colors.muted}`}>
                Planned degradation priority categories
              </p>
            </div>
          </div>

          {selectedLevel && (
            <button
              type="button"
              onClick={() => setSelectedLevel(null)}
              className={`text-xs font-semibold transition ${colors.buttonText}`}
            >
              Show all categories
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {visibleLevels.map((level) => {
            const isSelected = selectedLevel === level.id;

            return (
              <button
                key={level.id}
                type="button"
                onClick={() => handleLevelClick(level.id)}
                aria-pressed={isSelected}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                  isSelected ? colors.selected : colors.unselected
                }`}
              >
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${level.dot}`}
                />

                <span>
                  <span
                    className={`block text-xs font-semibold ${colors.heading}`}
                  >
                    {level.label}
                  </span>

                  <span className={`mt-0.5 block text-[10px] ${colors.muted}`}>
                    {level.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={`mt-5 flex items-start gap-2 border-t pt-4 ${colors.divider}`}
        >
          <Info size={15} className={`mt-0.5 shrink-0 ${colors.infoIcon}`} />

          <p className={`text-[11px] leading-5 ${colors.muted}`}>
            These colors represent the planned degradation-priority categories.
            Selecting a category currently filters the legend only. Map points
            and degradation classifications will appear after verified satellite
            analysis is integrated.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MonitoringMap;
