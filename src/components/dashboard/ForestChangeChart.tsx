import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Info } from "lucide-react";

import { useTheme } from "../../context/ThemeProvider";
import { forestAPI } from "../../services/api";
import type { ForestChange } from "../../types/forest";

const ForestChangeChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [data, setData] = useState<ForestChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChanges = async () => {
      try {
        const result = await forestAPI.getChanges();
        setData(result);
      } catch (err) {
        console.error("Failed to load forest changes:", err);
        setError("Unable to load forest change data.");
      } finally {
        setLoading(false);
      }
    };

    loadChanges();
  }, []);

  const colors = {
    card: isDark
      ? "border-slate-800 bg-[#111827]"
      : "border-[#dce6da] bg-white",

    heading: isDark ? "text-slate-100" : "text-[#263a31]",
    body: isDark ? "text-slate-400" : "text-[#647568]",
    muted: isDark ? "text-slate-500" : "text-[#849286]",

    divider: isDark ? "border-slate-800" : "border-[#e1e9df]",

    chartGrid: isDark ? "#263449" : "#e1e9df",
    axis: isDark ? "#94A3B8" : "#718174",

    tooltip: isDark ? "#0B1220" : "#FFFFFF",
    tooltipBorder: isDark ? "#334155" : "#dce6da",
    tooltipText: isDark ? "#CBD5E1" : "#47594d",
    tooltipHeading: isDark ? "#F8FAFC" : "#263a31",

    cursor: isDark ? "#64748B" : "#a8b5a8",

    activeDot: isDark ? "#111827" : "#FFFFFF",

    footer: isDark ? "bg-[#0B1220]/50" : "bg-[#f5f8f2]",
  };

  return (
    <section
      className={`overflow-hidden rounded-2xl border shadow-lg transition-colors duration-300 ${colors.card} ${
        isDark ? "shadow-black/10" : "shadow-ink/5"
      }`}
    >
      {/* CARD HEADER */}
      <div
        className={`flex flex-wrap items-start justify-between gap-4 border-b px-6 py-5 ${colors.divider}`}
      >
        <div>
          <div
            className={`mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.8px] ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            <TrendingUp size={14} />
            Forest Change Analysis
          </div>

          <h2 className={`font-heading text-lg font-bold ${colors.heading}`}>
            Forest Loss & Gain
          </h2>

          <p className={`mt-1 text-xs ${colors.muted}`}>
            Changes in monitored forest area over time
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span
            className={`text-[10px] font-bold tracking-wide ${
              isDark ? "text-amber-400" : "text-amber-700"
            }`}
          >
            DEMO PREVIEW
          </span>
        </div>
      </div>

      {/* CHART CONTENT */}
      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex h-80 items-center justify-center">
            <div className={`flex items-center gap-3 text-sm ${colors.body}`}>
              <span
                className={`h-4 w-4 animate-spin rounded-full border-2 ${
                  isDark
                    ? "border-slate-600 border-t-emerald-400"
                    : "border-[#dce6da] border-t-emerald-700"
                }`}
              />
              Loading forest change data...
            </div>
          </div>
        ) : error ? (
          <div className="flex h-80 flex-col items-center justify-center gap-3">
            <Info size={24} className="text-rose-500" />
            <p
              className={`text-sm ${
                isDark ? "text-rose-400" : "text-rose-700"
              }`}
            >
              {error}
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-80 flex-col items-center justify-center gap-2">
            <Info size={24} className={colors.muted} />
            <p className={`text-sm font-medium ${colors.body}`}>
              No forest change data available
            </p>
            <p className={`text-xs ${colors.muted}`}>
              Processed satellite observations will appear here.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 12, left: -15, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="forestLossGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#FB7185" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
                </linearGradient>

                <linearGradient
                  id="forestGainGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 5"
                vertical={false}
                stroke={colors.chartGrid}
              />

              <XAxis
                dataKey="month"
                tick={{ fill: colors.axis, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickMargin={12}
              />

              <YAxis
                tick={{ fill: colors.axis, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: colors.tooltip,
                  border: `1px solid ${colors.tooltipBorder}`,
                  borderRadius: "12px",
                  color: colors.tooltipText,
                  fontSize: "12px",
                  padding: "10px 14px",
                  boxShadow: isDark
                    ? "0 10px 30px rgba(0,0,0,0.3)"
                    : "0 10px 30px rgba(38,58,49,0.12)",
                }}
                labelStyle={{
                  color: colors.tooltipHeading,
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
                itemStyle={{
                  padding: "3px 0",
                }}
                cursor={{
                  stroke: colors.cursor,
                  strokeDasharray: "4 4",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={38}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "11px",
                  color: colors.tooltipText,
                  paddingTop: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="loss"
                name="Forest Loss"
                stroke="#FB7185"
                strokeWidth={2.5}
                fill="url(#forestLossGradient)"
                activeDot={{
                  r: 5,
                  stroke: "#FB7185",
                  strokeWidth: 2,
                  fill: colors.activeDot,
                }}
              />

              <Area
                type="monotone"
                dataKey="gain"
                name="Forest Gain"
                stroke="#4ADE80"
                strokeWidth={2.5}
                fill="url(#forestGainGradient)"
                activeDot={{
                  r: 5,
                  stroke: "#4ADE80",
                  strokeWidth: 2,
                  fill: colors.activeDot,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* FOOTER NOTE */}
      <div
        className={`flex items-start gap-2 border-t px-6 py-3 ${colors.divider} ${colors.footer}`}
      >
        <Info size={13} className={`mt-0.5 shrink-0 ${colors.muted}`} />
        <p className={`text-[10px] leading-relaxed ${colors.muted}`}>
          Forest change estimates are illustrative until verified satellite
          processing results are integrated.
        </p>
      </div>
    </section>
  );
};

export default ForestChangeChart;
