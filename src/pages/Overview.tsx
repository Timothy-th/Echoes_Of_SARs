import { Trees, TrendingDown, TrendingUp, Leaf } from "lucide-react";

import ForestChangeChart from "../components/dashboard/ForestChangeChart";
import ForestMap from "../components/dashboard/ForestMap";
import SatelliteComparison from "../components/dashboard/SatelliteComparison";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { forestAPI } from "../services/api";
import type { ForestSummary } from "../types/forest";

const Overview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [summary, setSummary] = useState<ForestSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await forestAPI.getSummary();
        setSummary(data);
      } catch (err) {
        setError("Unable to load forest summary.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  const stats = [
    {
      title: "Forest Coverage",
      value: summary?.forestCoverage ?? "—",
      unit: "km²",
      description: "Awaiting verified area data",
      icon: Trees,
      color: "#34D399",
      bg: isDark
        ? "border-emerald-500/20 bg-emerald-500/10"
        : "border-emerald-600/20 bg-emerald-500/10",
    },
    {
      title: "Forest Loss",
      value: summary?.forestLoss ?? "—",
      unit: "km²",
      description: "Awaiting detection results",
      icon: TrendingDown,
      color: "#FB7185",
      bg: isDark
        ? "border-rose-500/20 bg-rose-500/10"
        : "border-rose-600/20 bg-rose-500/10",
    },
    {
      title: "Forest Gain",
      value: summary?.forestGain ?? "—",
      unit: "km²",
      description: "Awaiting detection results",
      icon: TrendingUp,
      color: "#4ADE80",
      bg: isDark
        ? "border-green-500/20 bg-green-500/10"
        : "border-green-600/20 bg-green-500/10",
    },
    {
      title: "Vegetation Health",
      value: summary?.vegetationHealth ?? "—",
      unit: "NDVI",
      description: "Awaiting satellite analysis",
      icon: Leaf,
      color: "#38BDF8",
      bg: isDark
        ? "border-cyan-500/20 bg-cyan-500/10"
        : "border-cyan-600/20 bg-cyan-500/10",
    },
  ];

  const colors = {
    heading: isDark ? "text-slate-100" : "text-[#263a31]",
    body: isDark ? "text-slate-400" : "text-[#647568]",
    muted: isDark ? "text-slate-500" : "text-[#849286]",
    card: isDark
      ? "border-[#334155] bg-[#111827]"
      : "border-[#dce6da] bg-white",
    cardHover: isDark ? "hover:border-slate-600" : "hover:border-[#a8c5a5]",
    badge: isDark
      ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
      : "border-amber-600/20 bg-amber-500/10 text-amber-700",
  };

  return (
    <div
      className={`space-y-8 transition-colors duration-300 ${
        isDark ? "text-slate-100" : "text-ink"
      }`}
    >
      {/* Welcome section */}
      <section>
        <div
          className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${
            isDark ? "text-emerald-400" : "text-emerald-700"
          }`}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          FOREST MONITORING DASHBOARD
        </div>

        <h1
          className={`mt-3 font-heading text-3xl font-extrabold ${colors.heading}`}
        >
          Understanding Our Forests.
        </h1>

        <p className={`mt-2 max-w-2xl text-sm leading-6 ${colors.body}`}>
          Monitor forest conditions and identify potential changes across Bago
          Yoma using satellite observations.
        </p>
      </section>

      {/* Forest Indicators */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              className={`font-heading text-base font-bold ${colors.heading}`}
            >
              Forest Indicators
            </h2>

            <p className={`mt-1 text-xs ${colors.muted}`}>
              Key environmental monitoring metrics
            </p>
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide ${colors.badge}`}
          >
            DEMO DATA PENDING
          </span>
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`rounded-2xl border p-5 shadow-lg transition duration-300 hover:-translate-y-0.5 ${
                  colors.card
                } ${colors.cardHover} ${
                  isDark ? "shadow-black/10" : "shadow-ink/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-semibold ${colors.body}`}>
                    {stat.title}
                  </p>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.bg}`}
                    style={{ color: stat.color }}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span
                    className={`font-heading text-3xl font-extrabold ${colors.heading}`}
                  >
                    {loading ? "..." : error ? "—" : stat.value}
                  </span>

                  <span className={`text-xs ${colors.muted}`}>{stat.unit}</span>
                </div>

                <p className={`mt-2 text-[11px] ${colors.muted}`}>
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Forest Change Chart */}
      <section>
        <ForestChangeChart />
      </section>

      {/* Monitoring Map */}
      <section>
        <ForestMap />
      </section>

      {/* Satellite Comparison */}
      <section>
        <SatelliteComparison />
      </section>
    </div>
  );
};

export default Overview;
