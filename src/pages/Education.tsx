import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Globe2,
  Leaf,
  ShieldCheck,
  Sprout,
  Trees,
  Wind,
  Flame,
  Mountain,
  HeartPulse,
  TreeDeciduous,
} from "lucide-react";

import heroImage from "../assets/image/hero.png";

const forestBenefits = [
  {
    icon: Globe2,
    number: "01",
    title: "Biodiversity",
    description:
      "Forests provide habitats for plants, animals, fungi, and microorganisms. Healthy forest ecosystems help maintain biodiversity and ecological balance.",
  },
  {
    icon: Wind,
    number: "02",
    title: "Climate & Carbon",
    description:
      "Trees absorb carbon dioxide and store carbon in their trunks, roots, and surrounding soil, contributing to climate regulation.",
  },
  {
    icon: Droplets,
    number: "03",
    title: "Water & Soil",
    description:
      "Forest vegetation influences water cycles, protects watersheds, supports soil stability, and helps reduce erosion.",
  },
  {
    icon: Trees,
    number: "04",
    title: "Communities",
    description:
      "Forests provide natural resources, support livelihoods, and hold cultural, social, and economic importance for communities.",
  },
];

const forestThreats = [
  {
    icon: Trees,
    number: "01",
    title: "Agricultural Expansion",
    description:
      "Forests may be cleared to create agricultural land, plantations, or grazing areas. Unplanned expansion can fragment habitats and permanently reduce forest cover.",
  },
  {
    icon: TreeDeciduous,
    number: "02",
    title: "Logging & Resource Extraction",
    description:
      "Unsustainable timber harvesting, fuelwood collection, and other resource extraction can remove vegetation and damage forest structure.",
  },
  {
    icon: Flame,
    number: "03",
    title: "Forest Fires",
    description:
      "Uncontrolled fires can destroy vegetation, damage wildlife habitats, affect soil properties, and sometimes cause long-lasting ecosystem changes.",
  },
  {
    icon: Mountain,
    number: "04",
    title: "Infrastructure & Land Conversion",
    description:
      "Road construction, mining, settlements, and other land-use changes can divide forest landscapes and increase pressure on surrounding ecosystems.",
  },
];

const forestImpacts = [
  {
    icon: Globe2,
    title: "Biodiversity Decline",
    description:
      "Habitat loss and fragmentation can reduce wildlife populations, disrupt ecological relationships, and threaten species.",
  },
  {
    icon: Wind,
    title: "Climate Change",
    description:
      "Forest clearing and degradation can release stored carbon and reduce the ability of ecosystems to absorb and store carbon in the future.",
  },
  {
    icon: Droplets,
    title: "Water Cycle Disruption",
    description:
      "Changes in forest cover can influence water interception, infiltration, runoff, and watershed conditions.",
  },
  {
    icon: Mountain,
    title: "Soil Erosion",
    description:
      "Removing vegetation can expose soil to rainfall and surface runoff, increasing erosion and the risk of land degradation.",
  },
  {
    icon: HeartPulse,
    title: "Community Impacts",
    description:
      "Forest changes can affect natural resources, local livelihoods, food security, and the environmental services communities depend on.",
  },
  {
    icon: Leaf,
    title: "Ecosystem Instability",
    description:
      "Repeated disturbances can weaken ecological functions and make forest ecosystems more vulnerable to future environmental pressures.",
  },
];

const conservationActions = [
  {
    icon: ShieldCheck,
    title: "Protect Existing Forests",
    text: "Support forest protection, responsible land management, and the conservation of important habitats.",
  },
  {
    icon: Sprout,
    title: "Restore Damaged Areas",
    text: "Encourage appropriate ecological restoration using suitable native species and long-term care.",
  },
  {
    icon: Leaf,
    title: "Use Resources Responsibly",
    text: "Reduce unnecessary consumption and support responsible choices involving forest products.",
  },
  {
    icon: Trees,
    title: "Support Communities",
    text: "Encourage environmental education, community participation, and locally appropriate conservation initiatives.",
  },
];

const Education = () => {
  return (
    <div className="forest-knowledge-page overflow-hidden bg-cream">
      {/* INTRODUCTION */}
      <section className="section-container pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="scroll-reveal grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="section-label">
              Forest Knowledge · Learn & Understand
            </span>

            <h1 className="font-editorial mt-6 text-5xl leading-[1.08] text-forest-dark sm:text-6xl lg:text-7xl">
              Understanding
              <br />
              <span className="italic text-moss">our forests.</span>
            </h1>
          </div>

          <p className="max-w-lg text-sm leading-8 text-muted sm:text-base lg:justify-self-end">
            Forests are essential to life on Earth, but they face growing
            environmental pressures. Explore how forest ecosystems work,
            understand the difference between deforestation and forest
            degradation, and discover why protecting them matters.
          </p>
        </div>

        {/* FEATURED IMAGE */}
        <div className="scroll-scale relative mt-14 overflow-hidden rounded-2xl">
          <img
            src={heroImage}
            alt="Tropical forest landscape"
            className="parallax-image h-85 w-full object-cover sm:h-115"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#0b241a]/70 to-transparent" />

          <div className="absolute bottom-7 left-7 text-white! sm:bottom-10 sm:left-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
              Our natural world
            </span>

            <p className="education-image-caption font-editorial mt-2 text-3xl sm:text-4xl">
              Every forest has a purpose.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 01 — WHY FORESTS MATTER */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="section-container">
          <div className="scroll-reveal max-w-2xl">
            <span className="section-label">01 · Why forests matter</span>

            <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
              A foundation for life on Earth.
            </h2>

            <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
              Forests are more than collections of trees. They are complex
              ecosystems in which vegetation, wildlife, soil, water, and climate
              interact. Their benefits extend far beyond the forest itself,
              supporting both natural systems and human communities.
            </p>
          </div>

          {/* FOREST BENEFITS */}
          <div className="scroll-stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {forestBenefits.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="rounded-2xl border border-forest/10 bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-moss">
                      {item.number}
                    </span>

                    <Icon size={25} className="text-forest" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-editorial mt-10 text-2xl text-forest-dark">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 02 — DEFORESTATION VS DEGRADATION */}
      <section className="section-container py-24 lg:py-32">
        <div className="scroll-reveal mx-auto max-w-3xl text-center">
          <span className="section-label">
            02 · Understanding forest change
          </span>

          <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
            Two different problems. One changing forest.
          </h2>

          <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
            Forest loss and forest degradation are related, but they do not mean
            the same thing. Understanding the difference is essential when
            monitoring forest conditions and interpreting satellite
            observations.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* DEFORESTATION */}
          <article className="scroll-reveal-left overflow-hidden rounded-2xl border border-forest/10 bg-paper">
            <div className="relative h-64 overflow-hidden">
              <img
                src={heroImage}
                alt="Illustrative tropical forest landscape"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0b241a]/70 to-transparent" />

              <span className="absolute bottom-6 left-7 text-xs font-bold uppercase tracking-[0.2em] text-lime">
                Forest area loss
              </span>
            </div>

            <div className="p-8 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-widest text-moss">
                01 · Deforestation
              </span>

              <h3 className="font-editorial mt-4 text-3xl text-forest-dark sm:text-4xl">
                When forests disappear.
              </h3>

              <p className="mt-5 text-sm leading-8 text-muted sm:text-base">
                Deforestation occurs when forest land is permanently converted
                to another land use, such as agriculture, settlements,
                infrastructure, or other non-forest uses.
              </p>

              <div className="mt-7 rounded-xl bg-cream p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-moss">
                  What changes?
                </p>

                <p className="mt-3 text-sm leading-7 text-muted">
                  The area classified as forest decreases as forest land is
                  converted to another use.
                </p>
              </div>
            </div>
          </article>

          {/* FOREST DEGRADATION */}
          <article className="scroll-reveal-right overflow-hidden rounded-2xl border border-forest/10 bg-paper">
            <div className="relative h-64 overflow-hidden">
              <img
                src={heroImage}
                alt="Illustrative forest vegetation"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0b241a]/70 to-transparent" />

              <span className="absolute bottom-6 left-7 text-xs font-bold uppercase tracking-[0.2em] text-lime">
                Declining forest condition
              </span>
            </div>

            <div className="p-8 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-widest text-moss">
                02 · Forest degradation
              </span>

              <h3 className="font-editorial mt-4 text-3xl text-forest-dark sm:text-4xl">
                When forests become weaker.
              </h3>

              <p className="mt-5 text-sm leading-8 text-muted sm:text-base">
                Forest degradation occurs when a forest remains, but its
                ecological condition, structure, or ability to support
                biodiversity and ecosystem functions declines.
              </p>

              <div className="mt-7 rounded-xl bg-cream p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-moss">
                  What changes?
                </p>

                <p className="mt-3 text-sm leading-7 text-muted">
                  Forest quality may decline through canopy damage, vegetation
                  disturbance, repeated fires, or unsustainable resource
                  extraction.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* KEY DISTINCTION */}
        <div className="forest-distinction-card scroll-reveal mt-8 rounded-2xl bg-forest-deep p-7 text-white sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
                The key distinction
              </span>

              <h3 className="font-editorial mt-3 text-2xl sm:text-3xl">
                Forest area vs. forest condition.
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:min-w-72">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Deforestation
                </p>

                <p className="mt-2 font-editorial text-xl text-lime">
                  Area decreases
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Degradation
                </p>

                <p className="mt-2 font-editorial text-xl text-lime">
                  Quality declines
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — WHAT THREATENS FORESTS */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="section-container">
          <div className="grid gap-14 lg:grid-cols-2">
            {/* THREAT INTRODUCTION */}
            <div className="scroll-reveal-left">
              <span className="section-label">
                03 · Understanding the threats
              </span>

              <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
                What puts forest ecosystems under pressure?
              </h2>

              <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
                Forest changes can result from multiple human activities and
                environmental pressures. Some cause direct forest clearing,
                while others gradually damage forest structure and ecological
                functions.
              </p>

              <div className="mt-9 overflow-hidden rounded-2xl">
                <img
                  src={heroImage}
                  alt="Forest landscape"
                  className="h-75 w-full object-cover"
                />
              </div>
            </div>

            {/* THREAT LIST */}
            <div className="scroll-reveal-right space-y-0">
              {forestThreats.map((threat) => {
                const Icon = threat.icon;

                return (
                  <article
                    key={threat.number}
                    className="border-b border-forest/15 py-7 first:pt-0"
                  >
                    <div className="flex items-start gap-5">
                      <span className="pt-1 text-xs font-bold text-moss">
                        {threat.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <Icon
                            size={21}
                            className="shrink-0 text-forest"
                            strokeWidth={1.7}
                          />

                          <h3 className="font-heading text-lg font-bold text-forest-dark">
                            {threat.title}
                          </h3>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-muted">
                          {threat.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — ENVIRONMENTAL CONSEQUENCES */}
      <section className="section-container py-24 lg:py-32">
        <div className="scroll-reveal max-w-2xl">
          <span className="section-label">04 · Environmental consequences</span>

          <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
            What happens when forests are lost or degraded?
          </h2>

          <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
            The consequences extend beyond the trees themselves. Forest
            disturbances can affect wildlife, climate, water systems, soil, and
            the communities that depend on healthy ecosystems.
          </p>
        </div>

        {/* ENVIRONMENTAL IMPACTS */}
        <div className="scroll-stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {forestImpacts.map((impact) => {
            const Icon = impact.icon;

            return (
              <article
                key={impact.title}
                className="rounded-2xl border border-forest/10 bg-paper p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-light text-forest">
                  <Icon size={23} strokeWidth={1.5} />
                </div>

                <h3 className="font-editorial mt-7 text-2xl text-forest-dark">
                  {impact.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted">
                  {impact.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* SECTION 05 — MONITORING AND UNDERSTANDING */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="section-container">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="scroll-reveal-left">
              <span className="section-label">
                05 · Understanding forest changes
              </span>

              <h2 className="editorial-heading mt-6 text-4xl text-forest-dark sm:text-5xl">
                We cannot protect what we do not understand.
              </h2>

              <p className="mt-7 text-sm leading-8 text-muted sm:text-base">
                Forest monitoring helps us understand where changes are
                happening and how forest conditions may be evolving. Satellite
                observations allow researchers to examine extensive and often
                difficult-to-access landscapes over time.
              </p>

              <p className="mt-5 text-sm leading-8 text-muted sm:text-base">
                Optical imagery, radar observations, environmental information,
                and field evidence can contribute different perspectives.
                Combining these sources helps build a more complete
                understanding of potential forest disturbances.
              </p>

              <p className="mt-5 text-sm leading-8 text-muted sm:text-base">
                Satellite observations are valuable evidence, but they should be
                interpreted carefully. An unusual signal alone cannot confirm
                deforestation or forest degradation.
              </p>

              <Link
                to="/stories"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-forest transition-all hover:gap-4"
              >
                Discover our monitoring approach
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="scroll-reveal-right relative overflow-hidden rounded-2xl">
              <img
                src={heroImage}
                alt="Tropical forest landscape viewed from above"
                className="h-105 w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0b241a]/75 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-lime">
                  Forest monitoring
                </span>

                <p className="education-monitoring-caption font-editorial mt-3 text-2xl sm:text-3xl">
                  Observe changes. Understand the landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — CONSERVATION */}
      <section className="education-conservation bg-forest-deep py-24 text-white lg:py-32">
        <div className="section-container">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            {/* CONSERVATION INTRODUCTION */}
            <div className="scroll-reveal-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
                06 · Conservation & responsibility
              </span>

              <h2 className="font-editorial mt-6 text-4xl leading-tight sm:text-5xl">
                Protecting forests starts with understanding them.
              </h2>

              <p className="mt-7 text-sm leading-8 text-white/65 sm:text-base">
                Forest conservation involves more than planting trees. It
                includes protecting existing ecosystems, managing natural
                resources responsibly, supporting local communities, and
                restoring damaged environments.
              </p>

              <Link
                to="/take-action"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold text-forest-dark transition hover:bg-forest-dark"
              >
                Discover ways to help
                <ArrowUpRight size={17} />
              </Link>
            </div>

            {/* CONSERVATION CARDS */}
            <div className="scroll-stagger grid gap-4 sm:grid-cols-2">
              {conservationActions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                  >
                    <Icon size={26} className="text-lime" strokeWidth={1.5} />

                    <h3 className="font-heading mt-7 font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT CONNECTION */}
      <section className="section-container py-24 text-center lg:py-32">
        <div className="scroll-scale">
          <span className="section-label">Knowledge meets technology</span>

          <h2 className="editorial-heading mx-auto mt-6 max-w-3xl text-4xl text-forest-dark sm:text-5xl">
            Learn about forests.
            <br />
            Discover how we monitor them.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-muted">
            Explore how Echoes of SARs uses satellite observations to
            investigate potential forest changes across Central Bago Yoma,
            Myanmar.
          </p>
          <Link
            to="/monitor"
            className="education-monitor-link mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-sm font-bold transition hover:bg-forest-dark"
          >
            Explore Forest Monitor
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="education-footer bg-[#0b241a] py-8 text-white/50">
        {" "}
        <div className="scroll-reveal section-container flex flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center">
          <span className="font-heading font-bold tracking-wide text-white/80">
            Echoes of SARs
          </span>

          <span>Learn today. Protect tomorrow.</span>
        </div>
      </footer>
    </div>
  );
};

export default Education;
