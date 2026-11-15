import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Activity, Satellite, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "../context/ThemeProvider";
import { forestAPI } from "../services/api";
import type { SatelliteObservation } from "../types/forest";

const Analytics = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [observations, setObservations] = useState<SatelliteObservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadObservations = async () => {
      try {
        const data = await forestAPI.getObservations();
        setObservations(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load satellite observations.");
      } finally {
        setLoading(false);
      }
    };

    loadObservations();
  }, []);

  // Extract radar observations
  const sarData = observations
    .filter(
      (observation) =>
        observation.vv !== undefined || observation.vh !== undefined,
    )
    .map((observation) => ({
      date: observation.date,
      vv: observation.vv,
      vh: observation.vh,
    }));

  // Extract optical vegetation observations
  const ndviData = observations
    .filter((observation) => observation.ndvi !== undefined)
    .map((observation) => ({
      date: observation.date,
      ndvi: observation.ndvi,
    }));

  const colors = {
    heading: isDark ? "text-slate-100" : "text-[#263a31]",
    body: isDark ? "text-slate-400" : "text-[#647568]",
    muted: isDark ? "text-slate-500" : "text-[#849286]",

    card: isDark
      ? "border-[#334155] bg-[#111827]"
      : "border-[#dce6da] bg-white",

    cardShadow: isDark ? "shadow-black/10" : "shadow-[#263a31]/5",

    divider: isDark ? "border-slate-700/70" : "border-[#e1e9df]",

    icon: isDark
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      : "border-emerald-600/20 bg-emerald-500/10 text-emerald-700",

    emerald: isDark ? "text-emerald-400" : "text-emerald-700",
  };

  const chartAxis = {
    fill: isDark ? "#94A3B8" : "#647568",
    fontSize: 11,
  };

  const tooltipStyle = {
    backgroundColor: isDark ? "#111827" : "#FFFFFF",
    border: `1px solid ${isDark ? "#334155" : "#dce6da"}`,
    borderRadius: "12px",
    color: isDark ? "#F1F5F9" : "#263a31",
    fontSize: "12px",
    padding: "10px 14px",
  };

  const legendStyle = {
    color: isDark ? "#CBD5E1" : "#647568",
    fontSize: "12px",
    paddingTop: "12px",
  };

  const gridColor = isDark ? "#334155" : "#e1e9df";
  const tooltipText = isDark ? "#CBD5E1" : "#47594d";
  const tooltipHeading = isDark ? "#F1F5F9" : "#263a31";
  const cursorColor = isDark ? "#64748B" : "#a8b5a8";
  const activeDotStroke = isDark ? "#111827" : "#FFFFFF";

  return (
    <div
      className={`space-y-8 transition-colors duration-300 ${
        isDark ? "text-slate-100" : "text-ink"
      }`}
    >
      {/* PAGE HEADING */}
      <section>
        <div
          className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${colors.emerald}`}
        >
          <Activity size={15} />
          DATA ANALYSIS
        </div>

        <h1
          className={`mt-3 font-heading text-3xl font-extrabold ${colors.heading}`}
        >
          Forest Analytics
        </h1>

        <p className={`mt-2 max-w-2xl text-sm leading-6 ${colors.body}`}>
          Explore radar backscatter and vegetation observations to understand
          changes in forest conditions across Bago Yoma.
        </p>
      </section>

      {/* DEMO NOTICE */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
        <p
          className={`text-xs font-bold tracking-wider ${
            isDark ? "text-amber-400" : "text-amber-700"
          }`}
        >
          DEMONSTRATION DATA
        </p>

        <p
          className={`mt-1 text-[11px] leading-5 ${
            isDark ? "text-amber-200/70" : "text-amber-800/80"
          }`}
        >
          All chart values are fabricated examples for interface testing. They
          are not measurements from NISAR, Sentinel, or Bago Yoma.
        </p>
      </div>

      {/* LOADING AND ERROR STATES */}
      {loading && (
        <p className={`text-sm ${colors.body}`}>
          Loading satellite observations...
        </p>
      )}

      {error && (
        <p
          className={`rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm ${
            isDark ? "text-rose-400" : "text-rose-700"
          }`}
        >
          {error}
        </p>
      )}

      {!loading && !error && observations.length === 0 && (
        <p
          className={`rounded-xl border p-6 text-center text-sm ${colors.card} ${colors.body}`}
        >
          No satellite observations are currently available.
        </p>
      )}

      {/* SAR CHART */}
      <section
        className={`rounded-2xl border p-6 shadow-lg transition-colors duration-300 ${colors.card} ${colors.cardShadow}`}
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors.icon}`}
          >
            <Satellite size={20} />
          </div>

          <div>
            <h2
              className={`font-heading text-base font-bold ${colors.heading}`}
            >
              SAR Backscatter Analysis
            </h2>

            <p className={`mt-1 text-xs ${colors.body}`}>
              VV and VH polarization observations
            </p>
          </div>
        </div>

        {sarData.length > 0 ? (
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sarData}
                margin={{ top: 10, right: 15, left: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={gridColor}
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxis}
                  tickMargin={10}
                />

                <YAxis
                  domain={[-25, -5]}
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxis}
                  tickMargin={10}
                  label={{
                    value: "Backscatter (dB)",
                    angle: -90,
                    position: "insideLeft",
                    fill: chartAxis.fill,
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{
                    color: tooltipHeading,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                  itemStyle={{ color: tooltipText }}
                  cursor={{
                    stroke: cursorColor,
                    strokeDasharray: "4 4",
                  }}
                />

                <Legend wrapperStyle={legendStyle} />

                <Line
                  type="monotone"
                  dataKey="vv"
                  name="VV"
                  stroke="#34D399"
                  strokeWidth={2.5}
                  dot={{
                    r: 4,
                    fill: "#34D399",
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#34D399",
                    stroke: activeDotStroke,
                    strokeWidth: 2,
                  }}
                  connectNulls={false}
                />

                <Line
                  type="monotone"
                  dataKey="vh"
                  name="VH"
                  stroke="#FB7185"
                  strokeWidth={2.5}
                  dot={{
                    r: 4,
                    fill: "#FB7185",
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#FB7185",
                    stroke: activeDotStroke,
                    strokeWidth: 2,
                  }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          !loading && (
            <p className={`py-12 text-center text-sm ${colors.muted}`}>
              No SAR observations available.
            </p>
          )
        )}

        <p
          className={`mt-4 border-t pt-4 text-[11px] leading-5 ${colors.divider} ${colors.muted}`}
        >
          VV and VH represent different radar polarization channels. Backscatter
          variations can reflect changes in vegetation, moisture, and surface
          conditions. They do not independently confirm deforestation.
        </p>
      </section>

      {/* NDVI CHART */}
      <section
        className={`rounded-2xl border p-6 shadow-lg transition-colors duration-300 ${colors.card} ${colors.cardShadow}`}
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors.icon}`}
          >
            <Leaf size={20} />
          </div>

          <div>
            <h2
              className={`font-heading text-base font-bold ${colors.heading}`}
            >
              Vegetation Health Trend
            </h2>

            <p className={`mt-1 text-xs ${colors.body}`}>
              NDVI optical observations
            </p>
          </div>
        </div>

        {ndviData.length > 0 ? (
          <div className="h-70 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={ndviData}
                margin={{ top: 10, right: 15, left: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={gridColor}
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxis}
                  tickMargin={10}
                />

                <YAxis
                  domain={[0, 1]}
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxis}
                  tickMargin={10}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{
                    color: tooltipHeading,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                  itemStyle={{ color: tooltipText }}
                  cursor={{
                    stroke: cursorColor,
                    strokeDasharray: "4 4",
                  }}
                />

                <Legend wrapperStyle={legendStyle} />

                <Line
                  type="monotone"
                  dataKey="ndvi"
                  name="NDVI"
                  stroke="#4ADE80"
                  strokeWidth={2.5}
                  dot={{
                    r: 4,
                    fill: "#4ADE80",
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#4ADE80",
                    stroke: activeDotStroke,
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          !loading && (
            <p className={`py-12 text-center text-sm ${colors.muted}`}>
              No NDVI observations available.
            </p>
          )
        )}

        <p
          className={`mt-4 border-t pt-4 text-[11px] leading-5 ${colors.divider} ${colors.muted}`}
        >
          NDVI provides optical vegetation information and can help
          contextualize radar observations. It is not a direct measurement of
          forest area.
        </p>
      </section>
    </div>
  );
};

export default Analytics;
