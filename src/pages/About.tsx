import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Earth,
  Eye,
  Radar,
  Satellite,
  ScanEye,
  ShieldCheck,
  Trees,
} from "lucide-react";

import heroImage from "../assets/image/hero.png";

const projectPrinciples = [
  {
    icon: Eye,
    number: "01",
    title: "Observe",
    description:
      "Explore satellite observations to identify possible changes in forest conditions across Central Bago Yoma.",
  },
  {
    icon: ScanEye,
    number: "02",
    title: "Investigate",
    description:
      "Examine detected signals alongside environmental context and supporting evidence before drawing conclusions.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Protect",
    description:
      "Make forest information easier to understand and support informed conservation and monitoring decisions.",
  },
];

const technologies = [
  {
    icon: Radar,
    name: "NISAR",
    type: "L-band and S-band SAR",
    description:
      "The NASA–ISRO Synthetic Aperture Radar mission provides radar observations that can help monitor changes in Earth's surface and vegetation structure.",
    role: "Forest structure and health monitoring",
  },
  {
    icon: Satellite,
    name: "Sentinel-1",
    type: "C-band SAR",
    description:
      "Radar observations provide information about the Earth's surface in different weather and lighting conditions, supporting forest change investigation.",
    role: "Radar-based forest observation",
  },
  {
    icon: Earth,
    name: "Sentinel-2",
    type: "Multispectral optical imagery",
    description:
      "Multispectral imagery helps examine vegetation conditions and compare forest landscapes across different periods.",
    role: "Optical forest change comparison",
  },
];

const About = () => {
  return (
    <main className="about-page overflow-hidden bg-cream">
      {/* INTRODUCTION */}
      <section className="relative overflow-hidden bg-cream pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="section-container">
          {/* TOP INTRODUCTION */}
          <div className="scroll-reveal flex flex-col justify-between gap-8 border-b border-forest/15 pb-10 lg:flex-row lg:items-end">
            <div>
              <span className="section-label">
                About the project · Echoes of SARs
              </span>

              <h1 className="font-editorial mt-6 max-w-4xl text-5xl leading-[1.08] text-forest-dark sm:text-6xl lg:text-8xl">
                Seeing the forest
                <br />
                <span className="italic text-moss">beyond the surface.</span>
              </h1>
            </div>

            <div className="max-w-xs lg:pb-3">
              <p className="text-sm leading-8 text-muted">
                A satellite-based approach to understanding forest change,
                uncovering environmental signals, and supporting conservation
                awareness.
              </p>
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="scroll-scale relative mt-12 overflow-hidden rounded-2xl">
            <img
              src={heroImage}
              alt="Aerial view of the forests of Central Bago Yoma"
              className="h-100 w-full object-cover sm:h-125 lg:h-145"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#0b241a]/80 via-transparent to-transparent" />

            {/* IMAGE CAPTION */}
            <div className="absolute bottom-7 left-7 right-7 flex flex-col justify-between gap-6 text-white sm:bottom-10 sm:left-10 sm:right-10 lg:flex-row lg:items-end">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
                  Our mission
                </span>

                <p className="font-editorial mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  Every signal tells a story about our changing forests.
                </p>
              </div>

              <div className="about-image-location flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
                <span className="h-px w-10 bg-lime" />
                Forest observation · Myanmar
              </div>
            </div>
          </div>

          {/* PROJECT INFORMATION */}
          <div className="scroll-reveal mt-10 grid gap-8 sm:grid-cols-3">
            <div className="border-l-2 border-moss pl-5">
              <span className="text-xs font-bold uppercase tracking-widest text-moss">
                Project focus
              </span>

              <p className="font-editorial mt-3 text-2xl text-forest-dark">
                Forest monitoring
              </p>
            </div>

            <div className="border-l-2 border-moss pl-5">
              <span className="text-xs font-bold uppercase tracking-widest text-moss">
                Study region
              </span>

              <p className="font-editorial mt-3 text-2xl text-forest-dark">
                Central Bago Yoma
              </p>
            </div>

            <div className="border-l-2 border-moss pl-5">
              <span className="text-xs font-bold uppercase tracking-widest text-moss">
                Our approach
              </span>

              <p className="font-editorial mt-3 text-2xl text-forest-dark">
                Radar + Optical
              </p>
            </div>
          </div>

          {/* PROJECT DESCRIPTION */}
          <div className="scroll-reveal mt-20 grid gap-8 border-t border-forest/15 pt-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <div>
              <span className="section-label">A different perspective</span>

              <h2 className="font-editorial mt-5 text-3xl leading-tight text-forest-dark sm:text-4xl">
                Understanding what satellite images cannot tell us at first
                glance.
              </h2>
            </div>

            <div>
              <p className="text-base leading-8 text-muted">
                Echoes of SARs is a satellite-based forest monitoring and
                conservation-support project focused on the forests of Central
                Bago Yoma, Myanmar.
              </p>

              <p className="mt-5 text-base leading-8 text-muted">
                By bringing together radar observations, optical imagery, and
                accessible data visualization, we aim to make potential forest
                changes easier to explore, understand, and investigate.
              </p>

              <Link
                to="/stories"
                className="discover-approach-link mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-semibold transition hover:bg-forest-dark"
              >
                Discover our approach
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* MISSION */}
      <section className="bg-white py-20 lg:py-28">
        <div className="section-container">
          <div className="scroll-reveal mx-auto max-w-3xl text-center">
            <p className="section-label mb-5">Our mission</p>

            <h2 className="editorial-heading text-4xl text-forest-dark sm:text-5xl">
              Make forest observations meaningful and accessible.
            </h2>

            <p className="mt-7 text-base leading-8 text-muted">
              Satellite data can reveal patterns that are difficult to observe
              from the ground. However, scientific information becomes more
              useful when people can understand what it represents, explore
              where changes may be happening, and recognize the importance of
              further investigation.
            </p>
          </div>

          <div className="scroll-stagger mt-16 grid gap-5 md:grid-cols-3">
            {projectPrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.number}
                  className="rounded-2xl border border-border bg-cream p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-light text-forest">
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <span className="font-heading text-sm font-bold text-soft">
                      {principle.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-heading text-2xl font-bold text-forest-dark">
                    {principle.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* STUDY AREA */}
      <section className="section-container py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="scroll-reveal-left relative overflow-hidden rounded-2xl">
            <img
              src={heroImage}
              alt="Forest landscape representing the Bago Yoma study area"
              className="parallax-image h-96 w-full object-cover lg:h-115"
            />

            <div className="absolute inset-0 bg-linear-to-t from-forest-dark/50 to-transparent" />

            <div className="absolute bottom-7 left-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                Study area
              </p>

              <p className="mt-2 font-editorial text-3xl">Bago Yoma</p>
            </div>
          </div>

          <div className="scroll-reveal-right">
            <p className="section-label mb-5">Where we focus</p>

            <h2 className="editorial-heading text-4xl text-forest-dark sm:text-5xl">
              Exploring the forests of Central Bago Yoma.
            </h2>

            <p className="mt-6 leading-8 text-muted">
              Our project focuses on a defined study area in the Central Bago
              Yoma region of Myanmar. We use this Area of Interest (AOI) to
              explore satellite-based forest monitoring and compare observations
              across different periods.
            </p>

            <p className="mt-4 leading-8 text-muted">
              By examining the spatial distribution of possible changes, we aim
              to identify areas that may require closer investigation and
              further verification.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-white p-5">
              <div className="flex items-start gap-3">
                <Trees className="mt-1 shrink-0 text-forest" size={21} />

                <div>
                  <p className="font-heading text-sm font-bold text-forest-dark">
                    A focused monitoring area
                  </p>

                  <p className="mt-2 text-sm leading-7 text-muted">
                    A defined AOI helps keep satellite comparisons focused
                    within the selected region and supports more consistent
                    analysis across observation periods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* TECHNOLOGY */}
      <section className="bg-white py-20 lg:py-28">
        <div className="section-container">
          <div className="scroll-reveal mb-14 max-w-2xl">
            <p className="section-label mb-5">The technology behind it</p>

            <h2 className="editorial-heading text-4xl text-forest-dark sm:text-5xl">
              Different satellites. A clearer picture.
            </h2>

            <p className="mt-6 leading-8 text-muted">
              We explore radar and optical satellite observations because each
              technology provides a different perspective on Earth's surface and
              vegetation.
            </p>
          </div>

          <div className="scroll-stagger grid gap-5 lg:grid-cols-3">
            {technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <article
                  key={technology.name}
                  className="soft-card p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-light text-forest">
                    <Icon size={24} strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-7 font-heading text-2xl font-bold text-forest-dark">
                    {technology.name}
                  </h3>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-forest">
                    {technology.type}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-muted">
                    {technology.description}
                  </p>

                  <div className="mt-7 border-t border-border pt-5">
                    <p className="text-xs text-soft">Project contribution</p>

                    <p className="mt-2 text-sm font-semibold text-forest-dark">
                      {technology.role}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* SCIENTIFIC RESPONSIBILITY */}
      <section className="section-container py-20 lg:py-28">
        <div className="scroll-scale rounded-3xl bg-sage-light p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white! text-forest">
              <ShieldCheck size={24} />
            </div>

            <p className="section-label mt-7">Scientific responsibility</p>

            <h2 className="editorial-heading mt-4 text-4xl text-forest-dark sm:text-5xl">
              An observation is a starting point, not a final answer.
            </h2>

            <p className="mt-6 leading-8 text-muted">
              Satellite signals can be influenced by rainfall, soil moisture,
              vegetation conditions, and other environmental factors. A detected
              anomaly does not automatically confirm deforestation or forest
              degradation.
            </p>

            <p className="mt-4 leading-8 text-muted">
              Our approach emphasizes careful interpretation, comparison with
              supporting information, and field verification wherever possible.
              We aim to present potential changes as findings that deserve
              investigation, not as confirmed conclusions.
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-forest-dark py-20 text-white lg:py-24">
        <div className="section-container">
          <div className="scroll-scale text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">
              Explore the project
            </p>

            <h2 className="editorial-heading mx-auto mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              Let's understand the forest, one observation at a time.
            </h2>

            <p className="about-cta-description mx-auto mt-6 max-w-xl leading-8">
              Explore our forest monitoring dashboard and discover how satellite
              observations can help us investigate environmental change.
            </p>
            <Link
              to="/monitor"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-forest/50 hover:text-forest-dark"
            >
              Explore Forest Monitor
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
