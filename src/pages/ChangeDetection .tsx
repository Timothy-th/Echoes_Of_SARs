import {
  AlertTriangle,
  Trees,
  Activity,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  ScanSearch,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { forestAPI } from "../services/api";
import type { ChangeEvent } from "../types/forest";

const ChangeDetection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [changeEvents, setChangeEvents] = useState<ChangeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await forestAPI.getChangeEvents();
        setChangeEvents(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load change events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const totalEvents = changeEvents.length;

  const highPriority = changeEvents.filter(
    (event) => event.priority === "High",
  ).length;

  const areasUnderReview = changeEvents.filter(
    (event) => event.status === "Pending Review",
  ).length;

  const colors = {
    heading: isDark ? "text-slate-100" : "text-[#263a31]",
    body: isDark ? "text-slate-400" : "text-[#647568]",
    muted: isDark ? "text-slate-500" : "text-[#849286]",

    card: isDark
      ? "border-[#334155] bg-[#111827]"
      : "border-[#dce6da] bg-white",

    cardHover: isDark ? "hover:border-slate-600" : "hover:border-[#a8c5a5]",

    divider: isDark ? "border-slate-700" : "border-[#e1e9df]",

    rowHover: isDark ? "hover:bg-slate-800/40" : "hover:bg-[#f3f7f0]",

    progressTrack: isDark ? "bg-slate-700" : "bg-[#e1e9df]",

    subtlePanel: isDark
      ? "border-slate-700/70 bg-[#0B1220]"
      : "border-[#dce6da] bg-[#f5f8f2]",

    emerald: isDark ? "text-emerald-400" : "text-emerald-700",

    error: isDark ? "text-rose-400" : "text-rose-700",
  };

  const summaryCards = [
    {
      title: "Potential Change Events",
      value: totalEvents,
      icon: ScanSearch,
      color: "#34D399",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: AlertTriangle,
      color: "#FB7185",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
    {
      title: "Areas Under Review",
      value: areasUnderReview,
      icon: Trees,
      color: "#FBBF24",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  return (
    <div
      className={`space-y-8 transition-colors duration-300 ${
        isDark ? "text-slate-100" : "text-ink"
      }`}
    >
      {/* HEADING */}
      <section>
        <div
          className={`flex items-center gap-2 text-xs font-semibold tracking-wider ${colors.emerald}`}
        >
          <ScanSearch size={15} />
          FOREST CHANGE MONITORING
        </div>

        <h1
          className={`mt-3 font-heading text-3xl font-extrabold ${colors.heading}`}
        >
          Change Detection
        </h1>

        <p className={`mt-2 max-w-2xl text-sm leading-6 ${colors.body}`}>
          Identify and review potential forest changes through satellite
          observations across Bago Yoma.
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
          All events, locations, dates, and confidence scores below are
          fabricated examples for interface testing. They are not actual
          forest-loss detections.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-2xl border p-5 shadow-lg transition duration-200 ${colors.card} ${colors.cardHover} ${
                isDark ? "shadow-black/10" : "shadow-ink/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold ${colors.body}`}>
                  {card.title}
                </p>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${card.bg} ${card.border}`}
                  style={{ color: card.color }}
                >
                  <Icon size={20} />
                </div>
              </div>

              <h3
                className={`mt-5 font-heading text-3xl font-extrabold ${colors.heading}`}
              >
                {loading ? "..." : error ? "—" : card.value}
              </h3>
            </div>
          );
        })}
      </section>

      {/* EVENTS */}
      <section
        className={`overflow-hidden rounded-2xl border shadow-lg transition-colors duration-300 ${colors.card} ${
          isDark ? "shadow-black/10" : "shadow-ink/5"
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-b p-6 ${colors.divider}`}
        >
          <div>
            <h2
              className={`font-heading text-base font-bold ${colors.heading}`}
            >
              Potential Change Events
            </h2>

            <p className={`mt-1 text-xs ${colors.body}`}>
              Illustrative events awaiting verification
            </p>
          </div>

          <span
            className={`rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            {loading ? "LOADING..." : `${totalEvents} DEMO EVENTS`}
          </span>
        </div>

        <div
          className={`divide-y ${
            isDark ? "divide-slate-700/70" : "divide-[#e1e9df]"
          }`}
        >
          {loading ? (
            <p className={`p-6 text-sm ${colors.body}`}>
              Loading change events...
            </p>
          ) : error ? (
            <p className={`p-6 text-sm ${colors.error}`}>{error}</p>
          ) : changeEvents.length === 0 ? (
            <p className={`p-6 text-sm ${colors.body}`}>
              No potential change events available.
            </p>
          ) : (
            changeEvents.map((event) => {
              const eventColor =
                event.priority === "High"
                  ? "#FB7185"
                  : event.priority === "Medium"
                    ? "#FBBF24"
                    : "#4ADE80";

              return (
                <div
                  key={event.id}
                  className={`flex flex-col gap-4 p-5 transition-colors md:flex-row md:items-center ${colors.rowHover}`}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${eventColor}18`,
                      color: eventColor,
                    }}
                  >
                    <Activity size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-sm font-bold ${colors.heading}`}>
                        {event.changeType}
                      </h3>

                      <span
                        className="rounded-full px-2.5 py-1 text-[9px] font-bold"
                        style={{
                          backgroundColor: `${eventColor}18`,
                          color: eventColor,
                        }}
                      >
                        {event.priority} Priority
                      </span>
                    </div>

                    <div
                      className={`mt-2 flex flex-wrap gap-4 text-[10px] ${colors.body}`}
                    >
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {event.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        {event.date}
                      </span>
                    </div>

                    <p className={`mt-2 text-[11px] ${colors.muted}`}>
                      Status: {event.status}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 md:w-40">
                    <div className="flex-1">
                      <div className="mb-1 flex justify-between text-[10px]">
                        <span className={colors.muted}>Demo score</span>

                        <span className={`font-bold ${colors.heading}`}>
                          {event.confidence !== null
                            ? `${event.confidence}%`
                            : "N/A"}
                        </span>
                      </div>

                      <div
                        className={`h-1.5 overflow-hidden rounded-full ${colors.progressTrack}`}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${event.confidence ?? 0}%`,
                            backgroundColor: eventColor,
                          }}
                        />
                      </div>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className={`shrink-0 ${colors.muted}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* INTERPRETATION NOTE */}
      <section
        className={`rounded-2xl border p-5 ${
          isDark
            ? "border-cyan-500/20 bg-cyan-500/5"
            : "border-cyan-700/20 bg-cyan-50"
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle
            size={19}
            className={`mt-0.5 shrink-0 ${
              isDark ? "text-cyan-400" : "text-cyan-700"
            }`}
          />

          <div>
            <h3
              className={`text-sm font-bold ${
                isDark ? "text-cyan-300" : "text-cyan-800"
              }`}
            >
              Important: Detection is not confirmation
            </h3>

            <p className={`mt-2 text-xs leading-6 ${colors.body}`}>
              Changes in SAR backscatter can result from soil moisture,
              vegetation structure, surface conditions, or other factors.
              Potential events should be checked against optical imagery,
              forest-cover references, and additional observations before being
              classified as deforestation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangeDetection;
