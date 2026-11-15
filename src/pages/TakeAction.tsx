import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileSearch,
  HeartHandshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Sprout,
  Trees,
  Users,
} from "lucide-react";

import heroImage from "../assets/image/hero.png";

const investigationSteps = [
  {
    icon: FileSearch,
    number: "01",
    title: "Review satellite evidence",
    description:
      "Examine changes in satellite observations across different dates. Compare radar and optical evidence to understand what may be happening.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Locate priority areas",
    description:
      "Identify locations showing potential forest loss or unusual changes that may require closer investigation.",
  },
  {
    icon: Compass,
    number: "03",
    title: "Assess possible causes",
    description:
      "Consider possible explanations such as logging, fire, land conversion, seasonal variation, or environmental conditions.",
  },
];

const verificationSteps = [
  {
    icon: MapPin,
    title: "Record the location",
    description:
      "Document the geographic coordinates and the date of the observation.",
  },
  {
    icon: Camera,
    title: "Collect field evidence",
    description:
      "Capture photographs and observations of vegetation, land conditions, and possible disturbances.",
  },
  {
    icon: ClipboardCheck,
    title: "Evaluate the findings",
    description:
      "Compare field observations with satellite evidence to assess whether the suspected change is supported.",
  },
  {
    icon: CheckCircle2,
    title: "Document the outcome",
    description:
      "Record whether the observation is confirmed, requires further investigation, or is not supported by the available evidence.",
  },
];

const conservationResponses = [
  {
    icon: ShieldCheck,
    title: "Forest Protection",
    description:
      "Prioritize areas that may need protection and support appropriate monitoring and conservation measures.",
  },
  {
    icon: Sprout,
    title: "Forest Restoration",
    description:
      "Consider restoration opportunities using suitable native species and long-term ecosystem care.",
  },
  {
    icon: Trees,
    title: "Sustainable Land Management",
    description:
      "Encourage responsible land-use practices that reduce pressure on existing forest ecosystems.",
  },
  {
    icon: Users,
    title: "Community Conservation",
    description:
      "Work with local communities and conservation organizations to support awareness and forest protection.",
  },
];

const communityActions = [
  {
    icon: Leaf,
    title: "Make responsible choices",
    description:
      "Reduce unnecessary resource consumption and support responsibly sourced products.",
  },
  {
    icon: Sprout,
    title: "Support native tree planting",
    description:
      "Participate in suitable restoration projects and care for trees after planting.",
  },
  {
    icon: Camera,
    title: "Report environmental concerns",
    description:
      "Share credible observations of possible forest damage with appropriate local organizations or authorities.",
  },
  {
    icon: HeartHandshake,
    title: "Join conservation initiatives",
    description:
      "Support community programs, environmental education, and long-term conservation activities.",
  },
];

const TakeAction = () => {
  return (
    <main className="take-action-page overflow-hidden bg-cream">
      {/* HERO */}
      <section className="section-container pb-20 pt-20 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="scroll-reveal-left">
            <span className="section-label">
              Conservation Action · From Evidence to Impact
            </span>

            <h1 className="editorial-heading mt-6 max-w-xl text-5xl text-forest-dark sm:text-6xl lg:text-7xl">
              Understanding change.
              <br />
              <span className="italic text-moss">Inspiring action.</span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-muted sm:text-base">
              Detecting potential forest changes is only the beginning.
              Understanding where attention is needed, verifying what is
              happening on the ground, and planning responsible conservation
              responses are essential steps toward protecting forests.
            </p>

            <Link
              to="/monitor"
              className="explore-monitor-link mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-semibold transition hover:bg-forest-dark"
            >
              Explore Forest Monitor
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="scroll-reveal-right relative">
            <img
              src={heroImage}
              alt="Forest landscape"
              className="parallax-image relative h-96 w-full rounded-2xl object-cover shadow-xl lg:h-130"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/30 bg-white/90 p-5 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-xs">
              <span className="text-xs font-bold uppercase tracking-widest text-moss">
                The purpose
              </span>

              <p className="font-editorial mt-2 text-xl text-forest-dark">
                Turn forest observations into informed conservation decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 01 — UNDERSTAND THE FINDINGS */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="section-container">
          <div className="scroll-reveal max-w-3xl">
            <span className="section-label">01 · Understand the findings</span>

            <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
              Before taking action, understand what has changed.
            </h2>

            <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
              Satellite observations can reveal potential changes in forest
              conditions. Understanding these signals helps researchers decide
              which locations deserve further attention.
            </p>
          </div>

          <div className="scroll-stagger mt-14 grid gap-5 md:grid-cols-3">
            {investigationSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="rounded-2xl border border-forest/10 bg-cream p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-moss">
                      STEP {step.number}
                    </span>

                    <Icon size={25} className="text-forest" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-editorial mt-9 text-2xl text-forest-dark">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="scroll-reveal mt-10 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-light text-forest">
                <FileSearch size={21} />
              </div>

              <div>
                <h3 className="font-heading font-bold text-forest-dark">
                  An important distinction
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  A detected satellite anomaly does not automatically mean
                  deforestation or forest degradation has occurred. Radar
                  signals and vegetation indicators can be affected by moisture,
                  rainfall, seasonality, and other environmental conditions.
                  Further analysis and verification are needed before drawing
                  conclusions.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/detection"
              className="inline-flex items-center gap-2 text-sm font-bold text-forest transition hover:gap-4"
            >
              Explore change detection
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      {/* SECTION 02 — FIELD VERIFICATION */}
      <section className="section-container py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="scroll-reveal-left">
            <span className="section-label">
              02 · Field investigation & verification
            </span>

            <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
              What is happening on the ground?
            </h2>

            <p className="mt-7 text-sm leading-8 text-muted sm:text-base">
              Remote sensing helps identify possible changes across large areas,
              but field observations provide important context. Researchers can
              use ground evidence to investigate suspected forest disturbances
              and assess satellite-based findings.
            </p>

            <div className="mt-9 overflow-hidden rounded-2xl">
              <img
                src={heroImage}
                alt="Forest landscape for field investigation"
                className="h-80 w-full object-cover"
              />
            </div>
          </div>

          <div className="scroll-reveal-right">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-moss">
                A verification workflow
              </span>

              <h3 className="font-editorial mt-3 text-2xl text-forest-dark sm:text-3xl">
                From a potential hotspot to verified evidence.
              </h3>
            </div>

            <div className="space-y-0">
              {verificationSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="flex gap-5 border-b border-forest/15 py-6 first:pt-0 last:border-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-light text-forest">
                      <Icon size={21} strokeWidth={1.6} />
                    </div>

                    <div>
                      <span className="text-xs font-bold text-moss">
                        0{index + 1}
                      </span>

                      <h3 className="mt-1 font-heading font-bold text-forest-dark">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-muted">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 03 — CONSERVATION RESPONSES */}
      <section className="take-action-conservation bg-forest-deep py-24 text-white lg:py-32">
        <div className="section-container">
          <div className="scroll-reveal max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
              03 · Plan conservation responses
            </span>

            <h2 className="font-editorial mt-6 text-4xl leading-tight sm:text-5xl">
              Different challenges require different responses.
            </h2>

            <p className="mt-6 text-sm leading-8 text-white/65 sm:text-base">
              Once potential changes have been investigated and supported by
              evidence, appropriate responses can be considered according to the
              location, environmental conditions, and underlying causes.
            </p>
          </div>

          <div className="scroll-stagger mt-14 grid gap-5 sm:grid-cols-2">
            {conservationResponses.map((response) => {
              const Icon = response.icon;

              return (
                <article
                  key={response.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <Icon size={28} className="text-lime" strokeWidth={1.5} />

                  <h3 className="font-editorial mt-7 text-2xl">
                    {response.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/65">
                    {response.description}
                  </p>
                </article>
              );
            })}
          </div>

          <p className="scroll-reveal mt-10 text-xs leading-7 text-white/45">
            Conservation recommendations should be based on verified evidence,
            local knowledge, ecological assessments, and consultation with
            relevant stakeholders.
          </p>
        </div>
      </section>
      {/* SECTION 04 — COMMUNITY PARTICIPATION */}
      <section className="section-container py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="scroll-reveal-left">
            <span className="section-label">04 · Community participation</span>

            <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
              Forest protection is a shared responsibility.
            </h2>

            <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
              Researchers and scientists provide valuable evidence, but
              long-term forest conservation also depends on local communities,
              environmental organizations, and informed individuals.
            </p>

            <Link
              to="/education"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-forest transition hover:gap-4"
            >
              Learn about forest conservation
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="scroll-stagger grid gap-4 sm:grid-cols-2">
            {communityActions.map((action) => {
              const Icon = action.icon;

              return (
                <article
                  key={action.title}
                  className="rounded-2xl border border-forest/10 bg-paper p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-light text-forest">
                    <Icon size={21} strokeWidth={1.6} />
                  </div>

                  <h3 className="font-heading mt-6 font-bold text-forest-dark">
                    {action.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {action.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="take-action-final-cta bg-forest-dark py-24 text-white lg:py-32">
        <div className="scroll-scale section-container mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
            Echoes of SARs · Central Bago Yoma
          </span>

          <h2 className="font-editorial mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Every meaningful action begins with understanding.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/65 sm:text-base">
            Explore forest observations, investigate potential changes, and
            understand which areas may need further attention.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/monitor"
              className="take-action-monitor-btn inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold transition hover:bg-forest-deep"
            >
              Explore Forest Monitor
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/stories"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Discover Our Approach
              <BookOpen size={17} />
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="take-action-footer bg-[#0b241a] py-8 text-white/50">
        <div className="scroll-reveal section-container flex flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center">
          <span className="font-heading font-bold tracking-wide text-white/80">
            Echoes of SARs
          </span>

          <span>
            See the change. Understand the signal. Protect the future.
          </span>
        </div>
      </footer>
    </main>
  );
};

export default TakeAction;
