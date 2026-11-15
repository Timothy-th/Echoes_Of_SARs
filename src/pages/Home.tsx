import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Satellite,
  Search,
  Sprout,
  Trees,
  ShieldCheck,
} from "lucide-react";

import { useTheme } from "../context/ThemeProvider";

import heroImage from "../assets/image/hero.png";
import home from "../assets/image/home.png";

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "bg-[#0B1220]" : "bg-cream",
    section: isDark ? "bg-[#111827]" : "bg-paper",
    heading: isDark ? "text-slate-100" : "text-forest-dark",
    body: isDark ? "text-slate-300" : "text-muted",
    label: isDark ? "text-emerald-400" : "text-forest",
    number: isDark ? "text-emerald-400" : "text-moss",
    icon: isDark
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-sage-light text-forest",
    card: isDark
      ? "border-slate-700 bg-[#0B1220]"
      : "border-forest/10 bg-cream",
    marker: isDark ? "border-[#111827]" : "border-paper",
    line: isDark ? "bg-slate-700" : "bg-forest/20",
  };

  return (
    <div
      className={`overflow-hidden transition-colors duration-300 ${colors.page}`}
    >
      {/* HERO — Always retains its original dark design */}
      <section className="hero-section relative min-h-162.5 overflow-hidden bg-forest-deep text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Forest landscape"
            className="parallax-image h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#0b241a]/95 via-[#0b241a]/65 to-[#0b241a]/15" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b241a]/65 via-transparent to-[#0b241a]/20" />
        </div>

        <div className="section-container relative flex min-h-162.5 items-center py-24">
          <div className="max-w-3xl text-white">
            <span className="hero-content mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-lime" />
              SATELLITE-POWERED FOREST MONITORING
            </span>

            <h1 className="hero-content font-editorial text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              See the Change. <br />
              Understand the Signal. <br />
              <span className="italic text-lime">Protect the Forest.</span>
            </h1>

            <p className="hero-content mt-7 max-w-xl text-sm leading-8 text-white/85 sm:text-base">
              Echoes of SARs uses satellite observations to monitor
              deforestation and forest degradation across Central Bago Yoma,
              Myanmar. By identifying potential changes in forest conditions, we
              help researchers and scientists investigate vulnerable areas and
              prioritize conservation efforts.
            </p>

            <div className="hero-content mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/monitor"
                className="inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-forest-dark hover:text-forest-deep"
              >
                Explore Forest Monitor
                <ArrowUpRight size={17} />
              </Link>

              <Link
                to="/stories"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Discover Our Stories
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="hero-content mt-16 flex items-center gap-3 text-xs font-medium text-white/60">
              <ArrowDown size={16} />
              Scroll to explore
            </div>
          </div>
        </div>
      </section>

      {/* Z-PATTERN STORYTELLING */}
      <section
        className={`${colors.section} py-24 transition-colors duration-300`}
      >
        <div className="section-container">
          <div className="scroll-reveal mx-auto max-w-2xl text-center">
            <span className={`section-label ${colors.label}`}>
              Why this matters
            </span>

            <h2
              className={`editorial-heading mt-5 text-4xl sm:text-5xl ${colors.heading}`}
            >
              Forests Are Changing. Can We See It Before It's Too Late?
            </h2>

            <p className={`mt-5 text-sm leading-7 ${colors.body}`}>
              Understanding forest change is a journey. We bring three important
              stages together.
            </p>
          </div>

          <div className="relative mx-auto mt-20 max-w-5xl">
            <div
              className={`absolute bottom-16 left-1/2 top-16 hidden w-px -translate-x-1/2 md:block ${colors.line}`}
            />

            {[
              {
                number: "01",
                title: "Deforestation",
                description:
                  "Forest areas are cleared or converted into other land uses, causing permanent forest loss.",
                icon: Satellite,
              },
              {
                number: "02",
                title: "Forest Degradation",
                description:
                  "Forests may remain standing while their quality, structure, biodiversity, and ecological functions decline.",
                icon: Search,
              },
              {
                number: "03",
                title: "Difficult Monitoring",
                description:
                  "Remote forest areas are difficult to observe continuously through traditional ground surveys alone.",
                icon: Sprout,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.number}
                  className={`scroll-reveal relative mb-16 flex flex-col items-center md:mb-24 md:flex-row ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-forest shadow-[0_0_0_1px_rgba(40,89,67,0.3)] md:block ${colors.marker}`}
                  />

                  <article
                    className={`w-full md:w-[44%] ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-5 ${
                        isLeft ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${colors.icon}`}
                      >
                        <Icon size={25} strokeWidth={1.7} />
                      </div>

                      <span
                        className={`font-heading text-sm font-bold tracking-widest ${colors.number}`}
                      >
                        CHAPTER {item.number}
                      </span>
                    </div>

                    <h3
                      className={`font-editorial mt-6 text-3xl sm:text-4xl ${colors.heading}`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-4 text-sm leading-8 sm:text-base ${colors.body}`}
                    >
                      {item.description}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THREE STAGES */}
      <section
        className={`${colors.page} py-24 transition-colors duration-300`}
      >
        <div className="section-container">
          <div className="scroll-reveal mx-auto max-w-2xl text-center">
            <span className={`section-label ${colors.label}`}>
              Our approach
            </span>

            <h2
              className={`editorial-heading mt-5 text-4xl sm:text-5xl ${colors.heading}`}
            >
              Turning Satellite Signals Into Forest Intelligence
            </h2>

            <p className={`mt-5 text-sm leading-7 ${colors.body}`}>
              Understanding forest change is a journey. We bring three important
              stages together.
            </p>
          </div>

          <div className="scroll-stagger mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Observe",
                description:
                  "Collect satellite observations from Sentinel-1, Sentinel-2, and NASA–ISRO NISAR to examine forest conditions over time.",
                icon: Satellite,
              },
              {
                number: "02",
                title: "Analyze",
                description:
                  "Compare satellite observations, examine vegetation indicators and radar signals, and identify potential forest changes.",
                icon: Search,
              },
              {
                number: "03",
                title: "Investigate and Act",
                description:
                  "Highlight areas requiring further investigation so researchers and conservation teams can prioritize field verification and protection.",
                icon: Sprout,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className={`rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${colors.card}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-heading text-sm font-bold ${colors.number}`}
                    >
                      {item.number}
                    </span>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.icon}`}
                    >
                      <Icon size={22} strokeWidth={1.7} />
                    </div>
                  </div>

                  <h3
                    className={`font-editorial mt-10 text-3xl ${colors.heading}`}
                  >
                    {item.title}
                  </h3>

                  <p className={`mt-4 text-sm leading-7 ${colors.body}`}>
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        className={`${colors.page} section-container py-24 transition-colors duration-300 lg:py-32`}
      >
        <div className="scroll-reveal grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <span className={`section-label ${colors.label}`}>
              Our study area — Central Bago Yoma
            </span>

            <h2
              className={`editorial-heading mt-5 max-w-xl text-4xl sm:text-5xl ${colors.heading}`}
            >
              Understanding Forest Changes in Central Bago Yoma
            </h2>
          </div>

          <div className="max-w-xl">
            <p className={`text-sm leading-8 sm:text-base ${colors.body}`}>
              Central Bago Yoma is an important forest landscape in Myanmar,
              supporting diverse ecosystems, wildlife habitats, and essential
              environmental functions. However, forest areas face increasing
              pressure from human activities and environmental changes.
            </p>

            <p className={`mt-4 text-sm leading-8 sm:text-base ${colors.body}`}>
              Echoes of SARs focuses on monitoring forest conditions across this
              region using satellite observations to identify potential
              deforestation and degradation, understand how forest landscapes
              are changing over time, and highlight areas that may require
              further investigation, protection, or restoration.
            </p>
          </div>
        </div>
      </section>

      {/* MONITORING FEATURE */}
      <section
        className={`${colors.page} section-container py-24 transition-colors duration-300 lg:py-32`}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="scroll-reveal-left relative min-h-90 overflow-hidden rounded-2xl bg-forest">
            <img
              src={home}
              alt="Forest landscape viewed from above"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-linear-to-t from-forest-deep/90 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
                Central Bago Yoma
              </span>

              <h3 className="forest-heading-white font-editorial mt-3 text-3xl sm:text-4xl">
                Looking closer at our forests.
              </h3>
            </div>
          </div>

          <div className="scroll-reveal-right">
            <span className={`section-label ${colors.label}`}>
              Explore the data
            </span>

            <h2
              className={`editorial-heading mt-5 text-4xl sm:text-5xl ${colors.heading}`}
            >
              See what satellites can reveal.
            </h2>

            <p className={`mt-6 text-sm leading-8 sm:text-base ${colors.body}`}>
              Explore forest change through Sentinel-1 and Sentinel-2
              observations, and examine forest health signals using NISAR radar
              observations.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.icon}`}
                >
                  <Trees size={19} />
                </div>

                <div>
                  <h3
                    className={`font-heading text-sm font-bold ${colors.heading}`}
                  >
                    Forest change detection
                  </h3>

                  <p className={`mt-1 text-sm leading-6 ${colors.body}`}>
                    Compare forest conditions across different years.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.icon}`}
                >
                  <Satellite size={19} />
                </div>

                <div>
                  <h3
                    className={`font-heading text-sm font-bold ${colors.heading}`}
                  >
                    Forest health monitoring
                  </h3>

                  <p className={`mt-1 text-sm leading-6 ${colors.body}`}>
                    Examine unusual signals and identify areas for further
                    investigation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.icon}`}
                >
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h3
                    className={`font-heading text-sm font-bold ${colors.heading}`}
                  >
                    Evidence before conclusions
                  </h3>

                  <p className={`mt-1 text-sm leading-6 ${colors.body}`}>
                    Satellite anomalies indicate possible changes, not confirmed
                    forest degradation.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/monitor"
              className="hero-monitor-link group mt-9 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold transition-all duration-300"
            >
              Enter Forest Monitor
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA — Always dark */}
      <section className="bg-forest-deep py-24 text-white! final-cta">
        <div className="section-container text-center">
          <Sprout className="mx-auto text-lime" size={34} strokeWidth={1.5} />

          <h2 className="font-editorial mx-auto mt-7 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Every Change Leaves a Signal. Every Signal Deserves Attention.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/65">
            Explore satellite observations, investigate potential forest
            changes, and discover where further attention may be needed.
          </p>

          <Link
            to="/take-action"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold text-forest-deep transition hover:bg-forest-dark"
          >
            Be Part of the Change
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* FOOTER — Always dark */}
      <footer className="bg-[#0b241a] py-8 text-white/50">
        <div className="scroll-reveal section-container flex flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center">
          <span className="font-heading font-bold tracking-wide text-white/80">
            Echoes of SARs
          </span>

          <span>Forest monitoring, understanding & conservation.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
