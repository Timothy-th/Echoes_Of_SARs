import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Satellite,
  Radar,
  Search,
  Sprout,
  MapPin,
  Trees,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { useTheme } from "../context/ThemeProvider";
import heroImage from "../assets/image/hero.png";

const investigationSteps = [
  {
    title: "Observe",
    description:
      "Collect satellite observations to understand forest conditions across different locations and time periods.",
    icon: Satellite,
  },
  {
    title: "Compare",
    description:
      "Compare optical and radar observations to identify unusual changes and potential forest disturbances.",
    icon: Search,
  },
  {
    title: "Investigate",
    description:
      "Examine potential changes, review supporting evidence, and identify locations that need further attention.",
    icon: Radar,
  },
];

const researchPriorities = [
  "Locate potential forest-loss areas and areas showing unusual changes.",
  "Examine the spatial distribution and extent of detected changes.",
  "Review satellite evidence from different observation dates.",
  "Prioritize locations for further analysis and field verification.",
  "Support researchers in identifying areas that may need protection or restoration.",
];

const Stories = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "bg-[#0B1220]" : "bg-cream",
    section: isDark ? "bg-[#111827]" : "bg-paper",
    heading: isDark ? "text-slate-100" : "text-forest-dark",
    body: isDark ? "text-slate-300" : "text-muted",
    label: isDark ? "text-emerald-400!" : "text-forest",
    card: isDark
      ? "border-slate-700 bg-[#111827]"
      : "border-forest/10 bg-paper",
    cardInner: isDark
      ? "border-slate-700 bg-[#0B1220]"
      : "border-forest/10 bg-cream",
    icon: isDark
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-sage-light text-forest",
    marker: isDark ? "bg-emerald-400" : "bg-forest",
    divider: isDark ? "border-slate-700" : "border-forest/10",
  };

  return (
    <div
      className={`overflow-hidden transition-colors duration-300 ${colors.page}`}
    >
      {/* STORIES INTRODUCTION */}
      <section className="section-container pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="scroll-reveal grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <span className={`section-label ${colors.label}`}>
              Forest Stories · Echoes of SARs
            </span>

            <h1
              className={`font-editorial mt-6 text-5xl leading-[1.08] sm:text-6xl lg:text-7xl ${colors.heading}`}
            >
              Our Story
            </h1>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <p className={`text-sm leading-8 sm:text-base ${colors.body}`}>
              Forests are constantly changing, but not every change is easy to
              see. Across Central Bago Yoma, Myanmar, understanding these
              changes requires more than a single observation. Echoes of SARs
              brings together satellite observations and environmental
              information to help investigate potential forest loss, understand
              changing forest conditions, and identify areas that may need
              further attention.
            </p>

            <div
              className={`mt-7 flex items-center gap-3 text-xs font-bold uppercase tracking-widest ${colors.label}`}
            >
              <span className={`h-px w-10 ${colors.marker}`} />A journey through
              Central Bago Yoma
            </div>
          </div>
        </div>

        {/* FEATURED STORY IMAGE */}
        <div className="scroll-scale relative mt-14 overflow-hidden rounded-2xl">
          <img
            src={heroImage}
            alt="Aerial view of a tropical forest landscape"
            className="parallax-image h-95 w-full object-cover sm:h-120 lg:h-140"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#0b241a]/75 via-transparent to-transparent" />

          <div className="absolute bottom-7 left-7 text-white sm:bottom-10 sm:left-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
              The beginning
            </span>
            <p className="stories-featured-text font-editorial mt-2 text-2xl sm:text-3xl">
              Every forest has a story.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 01 — THE LIVING FOREST */}
      <section id="chapter-one" className="section-container py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="scroll-reveal-left">
            <span className={`section-label ${colors.label}`}>
              Chapter 01 — The living forest
            </span>

            <h2
              className={`editorial-heading mt-6 text-4xl sm:text-5xl ${colors.heading}`}
            >
              More than a landscape.
              <br />A living ecosystem.
            </h2>

            <p className={`mt-7 text-sm leading-8 sm:text-base ${colors.body}`}>
              Forests are complex ecosystems where vegetation, wildlife, soil,
              water, and climate interact. They provide habitats for
              biodiversity, store carbon, regulate water systems, and support
              the communities that depend on natural resources.
            </p>

            <p className={`mt-5 text-sm leading-8 sm:text-base ${colors.body}`}>
              Central Bago Yoma is our study area. To understand how its forests
              are changing, we first need to understand the landscape itself and
              the environmental conditions that influence it.
            </p>

            <p className={`mt-5 text-sm leading-8 sm:text-base ${colors.body}`}>
              A forest does not have to disappear completely to be affected. Its
              vegetation structure, moisture conditions, and ecological quality
              can change even while trees remain standing.
            </p>

            <Link
              to="/education"
              className={`mt-8 inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-4 ${colors.label}`}
            >
              Explore forest knowledge
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="scroll-reveal-right relative">
            <img
              src={heroImage}
              alt="Green tropical forest canopy"
              className="h-100 w-full rounded-2xl object-cover"
            />

            <div className="stories-image-caption absolute bottom-5 left-5 rounded-xl px-5 py-4 backdrop-blur-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest">
                A connected ecosystem
              </span>

              <p className="font-editorial mt-1 text-xl">Every part matters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 02 — SEEING BEYOND THE SURFACE */}
      <section
        className={`relative overflow-hidden py-24 transition-colors duration-300 lg:py-32 ${
          isDark ? "bg-[#111827] text-slate-100" : "bg-[#e8efe6] text-ink"
        }`}
      >
        <div className="section-container">
          <div className="scroll-reveal mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
              Chapter 02 — Seeing beyond the surface
            </span>

            <h2 className="font-editorial mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              What if we could observe forests beyond what our eyes can see?
            </h2>

            <p
              className={`mx-auto mt-6 max-w-2xl text-sm leading-8 sm:text-base ${
                isDark ? "text-slate-300" : "text-[#586b5d]"
              }`}
            >
              Satellite remote sensing allows us to examine forest conditions
              over large areas and across different periods. Echoes of SARs
              combines optical and radar observations to understand different
              aspects of the landscape.
            </p>
          </div>

          {/* OBSERVATION METHODS */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {/* OPTICAL OBSERVATIONS */}
            <article
              className={`scroll-reveal-left flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                isDark
                  ? "border-white/10 bg-white/4 hover:border-lime/30"
                  : "border-[#cbd9c9] bg-[#f5f8f2] shadow-sm hover:border-[#849c70]"
              }`}
            >
              <div
                className={`border-b p-7 sm:p-8 ${
                  isDark ? "border-white/10" : "border-[#dce6d8]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Multispectral imagery
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime/10">
                    <Satellite size={21} className="text-emerald-600" />
                  </div>
                </div>

                <h3 className="font-editorial mt-5 text-2xl sm:text-3xl">
                  Optical observations
                </h3>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Sentinel-2 · Optical satellite
                </p>

                <p
                  className={`mt-5 text-sm leading-7 ${
                    isDark ? "text-slate-300" : "text-[#586b5d]"
                  }`}
                >
                  Sentinel-2 provides multispectral optical imagery. Vegetation
                  indicators help us examine different aspects of forest
                  conditions and vegetation changes.
                </p>
              </div>

              <div className="flex-1 space-y-3 p-7 sm:p-8">
                {[
                  {
                    name: "NDVI",
                    label: "Greenness",
                    description: "Indicates vegetation greenness and activity.",
                  },
                  {
                    name: "NDMI",
                    label: "Moisture",
                    description:
                      "Provides information about vegetation moisture conditions.",
                  },
                  {
                    name: "NBR",
                    label: "Disturbance",
                    description:
                      "Helps identify changes associated with vegetation disturbance and burned areas.",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`rounded-xl border p-5 transition-colors ${
                      isDark
                        ? "border-white/5 bg-white/[0.035]"
                        : "border-[#dce6d8] bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-emerald-600">
                        {item.name}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-wider ${
                          isDark ? "text-slate-400" : "text-muted"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <p
                      className={`mt-2 text-sm leading-6 ${
                        isDark ? "text-slate-300" : "text-[#586b5d]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`border-t px-7 py-5 sm:px-8 ${
                  isDark ? "border-white/10" : "border-[#dce6d8]"
                }`}
              >
                <span
                  className={`text-xs ${
                    isDark ? "text-slate-400" : "text-muted"
                  }`}
                >
                  Vegetation indicators · Multispectral data
                </span>
              </div>
            </article>

            {/* RADAR OBSERVATIONS */}
            <article
              className={`scroll-reveal-right flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                isDark
                  ? "border-white/10 bg-white/4 hover:border-lime/30"
                  : "border-[#cbd9c9] bg-[#f5f8f2] shadow-sm hover:border-[#849c70]"
              }`}
            >
              <div
                className={`border-b p-7 sm:p-8 ${
                  isDark ? "border-white/10" : "border-[#dce6d8]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Synthetic Aperture Radar
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime/10">
                    <Radar size={21} className="text-emerald-600" />
                  </div>
                </div>

                <h3 className="font-editorial mt-5 text-2xl sm:text-3xl">
                  Radar observations
                </h3>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Sentinel-1 & NASA–ISRO NISAR
                </p>

                <p
                  className={`mt-5 text-sm leading-7 ${
                    isDark ? "text-slate-300" : "text-[#586b5d]"
                  }`}
                >
                  Synthetic Aperture Radar uses microwave signals to observe the
                  Earth's surface. Unlike optical imagery, radar can collect
                  observations through cloud cover, making it valuable for
                  monitoring tropical forest regions.
                </p>
              </div>

              <div className="flex-1 space-y-4 p-7 sm:p-8">
                {/* SENTINEL-1 */}
                <div
                  className={`rounded-xl border p-6 ${
                    isDark
                      ? "border-white/5 bg-white/[0.035]"
                      : "border-[#dce6d8] bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime/10">
                      <Satellite size={19} className="text-emerald-600" />
                    </div>

                    <div>
                      <h4 className="font-heading text-sm font-bold">
                        Sentinel-1
                      </h4>
                      <span className="text-xs text-emerald-400">
                        C-band radar
                      </span>
                    </div>
                  </div>

                  <p
                    className={`mt-4 text-sm leading-7 ${
                      isDark ? "text-slate-300" : "text-[#586b5d]"
                    }`}
                  >
                    Provides radar observations that help examine surface
                    characteristics and changes in vegetation conditions.
                  </p>
                </div>

                {/* NISAR */}
                <div
                  className={`rounded-xl border p-6 ${
                    isDark
                      ? "border-white/5 bg-white/[0.035]"
                      : "border-[#dce6d8] bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime/10">
                      <Radar size={19} className="text-emerald-600" />
                    </div>

                    <div>
                      <h4 className="font-heading text-sm font-bold">
                        NASA–ISRO NISAR
                      </h4>
                      <span className="text-xs text-emerald-400">
                        L-band & S-band radar
                      </span>
                    </div>
                  </div>

                  <p
                    className={`mt-4 text-sm leading-7 ${
                      isDark ? "text-slate-300" : "text-[#586b5d]"
                    }`}
                  >
                    Its L-band measurements can provide useful information about
                    vegetation structure and changes in forest conditions.
                  </p>
                </div>
              </div>

              <div
                className={`border-t px-7 py-5 sm:px-8 ${
                  isDark ? "border-white/10" : "border-[#dce6d8]"
                }`}
              >
                <span
                  className={`text-xs ${
                    isDark ? "text-slate-400" : "text-muted"
                  }`}
                >
                  Microwave observations · Radar backscatter
                </span>
              </div>
            </article>
          </div>

          {/* CLOSING NOTE */}
          <div
            className={`scroll-reveal mx-auto mt-10 flex max-w-4xl items-start gap-4 rounded-xl border p-6 sm:p-7 ${
              isDark
                ? "border-lime/20 bg-lime/5"
                : "border-[#cbd9b9] bg-[#f5f8ed]"
            }`}
          >
            <Activity size={21} className="mt-1 shrink-0 text-lime" />

            <p
              className={`text-sm leading-7 ${
                isDark ? "text-slate-300" : "text-[#586b5d]"
              }`}
            >
              Each satellite provides different information. Combining optical
              and radar observations helps us investigate forest changes more
              effectively, but no single satellite indicator can independently
              confirm forest degradation.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — WHEN SIGNALS CHANGE */}
      <section className="section-container py-24 lg:py-32">
        <div className="scroll-reveal mx-auto max-w-3xl text-center">
          <span className={`section-label ${colors.label}`}>
            Chapter 03 — When signals change
          </span>

          <h2
            className={`editorial-heading mt-6 text-4xl sm:text-5xl ${colors.heading}`}
          >
            A change in the signal is a reason to investigate.
          </h2>

          <p className={`mt-6 text-sm leading-8 sm:text-base ${colors.body}`}>
            Forest conditions are not static. Changes in vegetation, moisture,
            surface conditions, and environmental factors can influence
            satellite observations. By comparing observations collected at
            different times, we can identify unusual patterns that may require
            further examination.
          </p>

          <p className={`mt-5 text-sm leading-8 sm:text-base ${colors.body}`}>
            Radar is particularly useful in regions where cloud cover can limit
            optical observations. However, a change in radar backscatter does
            not automatically mean that deforestation or degradation has
            occurred.
          </p>
        </div>

        {/* INVESTIGATION STEPS */}
        <div className="scroll-stagger mt-16 grid gap-6 md:grid-cols-3">
          {investigationSteps.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${colors.card}`}
              >
                <span
                  className={`font-heading text-xs font-bold ${colors.label}`}
                >
                  STEP 0{index + 1}
                </span>

                <div
                  className={`mt-8 flex h-12 w-12 items-center justify-center rounded-full ${colors.icon}`}
                >
                  <Icon size={22} />
                </div>

                <h3
                  className={`font-editorial mt-7 text-2xl ${colors.heading}`}
                >
                  {item.title}
                </h3>

                <p className={`mt-3 text-sm leading-7 ${colors.body}`}>
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div
          className={`scroll-reveal mt-10 rounded-xl border p-6 ${colors.card}`}
        >
          <div className="flex items-start gap-3">
            <Activity size={21} className={`mt-1 shrink-0 ${colors.label}`} />

            <div>
              <h3 className={`font-semibold ${colors.heading}`}>
                Why further investigation matters
              </h3>

              <p className={`mt-2 text-sm leading-7 ${colors.body}`}>
                Radar and vegetation anomalies are indicators for further
                investigation, not confirmed evidence of deforestation or forest
                degradation. Environmental conditions, seasonal changes, and
                other factors must also be considered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 04 — UNDERSTANDING THE EVIDENCE */}
      <section className={`py-24 lg:py-32 ${colors.section}`}>
        <div className="section-container">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="scroll-reveal-left">
              <span className={`section-label ${colors.label}`}>
                Chapter 04 — Understanding the evidence
              </span>

              <h2
                className={`editorial-heading mt-6 text-4xl sm:text-5xl ${colors.heading}`}
              >
                Time reveals what a single image cannot.
              </h2>

              <p
                className={`mt-7 text-sm leading-8 sm:text-base ${colors.body}`}
              >
                A single satellite image provides only one observation of the
                landscape. Comparing observations from different periods helps
                us understand how forest conditions may have changed.
              </p>

              <p
                className={`mt-5 text-sm leading-8 sm:text-base ${colors.body}`}
              >
                Our project investigates forest changes by comparing Sentinel-2
                optical imagery across selected years and examining radar
                observations from Sentinel-1 and NISAR. These different sources
                provide complementary information for understanding potential
                disturbances.
              </p>

              <h3
                className={`mt-8 font-editorial text-xl font-semibold sm:text-2xl ${colors.heading}`}
              >
                Our analysis aims to:
              </h3>

              <ul
                className={`mt-5 space-y-3 text-sm leading-7 sm:text-base ${colors.body}`}
              >
                {[
                  "Identify potential forest-loss areas.",
                  "Extract candidate change polygons.",
                  "Estimate affected areas in hectares.",
                  "Compare detected changes with satellite imagery.",
                  "Investigate possible land-cover conditions after disturbance.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`mt-3 h-1.5 w-1.5 shrink-0 rounded-full ${colors.marker}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/detection"
                className={`mt-8 inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-4 ${colors.label}`}
              >
                Explore forest change detection
                <ArrowUpRight size={17} />
              </Link>
            </div>

            {/* YEAR COMPARISON */}
            <div className="scroll-reveal-right">
              <div className="grid grid-cols-2 items-start gap-4">
                {/* EARLIER PERIOD */}
                <div
                  className={`overflow-hidden rounded-2xl border ${
                    isDark ? "border-slate-700" : "border-[#dce6d8]"
                  }`}
                >
                  <img
                    src={heroImage}
                    alt="Illustrative forest landscape representing an earlier observation"
                    className="h-64 w-full object-cover"
                  />

                  <div className="bg-[#263f32] px-5 py-4 text-white! year-card-label">
                    <span className="text-xs uppercase tracking-widest text-[#c5df83]">
                      Earlier period
                    </span>
                    <p className="font-editorial mt-1 text-2xl text-white!">
                      2020
                    </p>
                  </div>
                </div>

                {/* LATER PERIOD */}
                <div
                  className={`mt-10 overflow-hidden rounded-2xl border ${
                    isDark ? "border-slate-700" : "border-[#dce6d8]"
                  }`}
                >
                  <img
                    src={heroImage}
                    alt="Illustrative forest landscape representing a later observation"
                    className="h-64 w-full object-cover"
                  />

                  <div className="bg-[#1b3026] px-5 py-4 text-white! year-card-label">
                    <span className="text-xs uppercase tracking-widest text-[#c5df83]">
                      Later period
                    </span>
                    <p className="font-editorial mt-1 text-2xl text-white!">
                      2026
                    </p>
                  </div>
                </div>
              </div>

              <p
                className={`mt-5 text-xs leading-6 ${
                  isDark ? "text-slate-400" : "text-[#586b5d]"
                }`}
              >
                Illustrative imagery only. These images do not represent actual
                detected forest changes. Processed satellite results will be
                used for scientific comparison.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 05 — WHERE ATTENTION IS NEEDED */}
      <section className="section-container py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="scroll-reveal-left">
            <span className={`section-label ${colors.label}`}>
              Chapter 05 — Where attention is needed
            </span>

            <h2
              className={`editorial-heading mt-6 text-4xl sm:text-5xl ${colors.heading}`}
            >
              Finding the places that need a closer look.
            </h2>

            <p className={`mt-7 text-sm leading-8 sm:text-base ${colors.body}`}>
              Detecting a potential change is only the beginning. Researchers
              also need to understand where it is happening, what evidence
              supports the observation, and whether the area requires further
              investigation.
            </p>

            <p className={`mt-5 text-sm leading-8 sm:text-base ${colors.body}`}>
              Echoes of SARs aims to make these findings easier to explore by
              presenting potential change locations and supporting satellite
              evidence in a clear monitoring environment.
            </p>

            <h3
              className={`mt-8 font-editorial text-xl font-semibold sm:text-2xl ${colors.heading}`}
            >
              Our research priorities include:
            </h3>

            <ul
              className={`mt-5 space-y-4 text-sm leading-7 sm:text-base ${colors.body}`}
            >
              {researchPriorities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className={`mt-3 h-1.5 w-1.5 shrink-0 rounded-full ${colors.marker}`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/monitor"
              className={`mt-8 inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-4 ${colors.label}`}
            >
              Explore monitoring results
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {/* FIELD INVESTIGATION CARD */}
          <div className="scroll-reveal-right">
            <div
              className={`relative overflow-hidden rounded-2xl p-8 transition-colors duration-300 sm:p-10 ${
                isDark ? "bg-[#263F32] text-slate-100" : "bg-[#e2ecdf] text-ink"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold uppercase tracking-[0.2em] ${
                    isDark ? "text-lime" : "text-[#527344]"
                  }`}
                >
                  From satellite to field
                </span>

                <MapPin
                  size={23}
                  className={isDark ? "text-lime" : "text-[#527344]"}
                />
              </div>

              <div className="my-10 flex items-center justify-center">
                <div
                  className={`flex h-48 w-48 items-center justify-center rounded-full border ${
                    isDark
                      ? "border-lime/30 bg-lime/5"
                      : "border-[#8da77c] bg-[#d2e1cb]"
                  }`}
                >
                  <div
                    className={`flex h-32 w-32 items-center justify-center rounded-full border ${
                      isDark
                        ? "border-lime/50 bg-lime/10"
                        : "border-[#8da77c] bg-[#c4d8b9]"
                    }`}
                  >
                    <Trees
                      size={55}
                      strokeWidth={1.2}
                      className={isDark ? "text-lime" : "text-[#527344]"}
                    />
                  </div>
                </div>
              </div>

              <h3
                className={`font-editorial text-2xl sm:text-3xl ${
                  isDark ? "text-slate-100" : "text-ink"
                }`}
              >
                Evidence should lead to investigation.
              </h3>

              <p
                className={`mt-4 text-sm leading-7 ${
                  isDark ? "text-slate-300" : "text-[#586b5d]"
                }`}
              >
                Potential hotspots can help researchers decide where to focus
                further analysis and, where possible, conduct field verification
                before drawing conclusions.
              </p>

              <div
                className={`mt-8 border-t pt-6 ${
                  isDark ? "border-white/10" : "border-[#c4d4bd]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={21}
                    className={`mt-1 shrink-0 ${
                      isDark ? "text-lime" : "text-[#527344]"
                    }`}
                  />

                  <p
                    className={`text-xs leading-6 ${
                      isDark ? "text-slate-400" : "text-[#657767]"
                    }`}
                  >
                    Satellite-based findings are intended to support
                    investigation and decision-making. Field evidence and
                    additional datasets remain important for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CHAPTER — THE NEXT STEP (THEME INDEPENDENT) */}
      <section className="stories-final-chapter relative isolate overflow-hidden bg-forest-deep py-28 text-center text-white lg:py-36">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="scroll-scale section-container relative mx-auto max-w-3xl">
          <Sprout size={38} className="mx-auto text-lime" />

          <span className="mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-lime">
            The next chapter
          </span>

          <h2 className="font-editorial mt-6 text-4xl leading-tight text-white sm:text-5xl">
            The story should not end when we detect a change.
          </h2>

          <p className="mt-7 text-sm leading-8 text-white/75 sm:text-base">
            Understanding where forests are changing is an important step toward
            protecting them. Echoes of SARs aims to connect satellite
            observations with meaningful investigation, helping researchers and
            conservation teams recognize where further attention may be needed.
          </p>

          <p className="font-editorial mt-8 text-xl italic leading-relaxed text-lime sm:text-2xl">
            See the change. Understand the signal. Protect the future.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/monitor"
              className="inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-forest-dark"
            >
              Explore Forest Monitoring
              <ArrowUpRight size={17} />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              About Our Project
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER — THEME INDEPENDENT */}
      <footer className="bg-[#0b241a] py-8 text-white/50">
        <div className="scroll-reveal section-container flex flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center">
          <span className="font-heading font-bold tracking-wide text-white/80">
            Echoes of SARs
          </span>

          <span>Every forest has a story worth protecting.</span>
        </div>
      </footer>
    </div>
  );
};

export default Stories;
