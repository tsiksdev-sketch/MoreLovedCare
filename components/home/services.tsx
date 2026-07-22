
import { Heart, Brain, Users2, Accessibility, Sparkles, Baby, ArrowUpRight } from "lucide-react";
import Reveal from "./reveal";
import Image from "next/image";

const services = [
  {
    icon: Heart,
    title: "Personal care at home",
    text: "Respectful assistance with washing, dressing, oral care, toileting, continence care and grooming.",
    src: "/personal-care-at-home.jpg",
    feature: true,
  },
  {
    icon: Users2,
    title: "Support for older people",
    text: "Care that helps older people remain safe, involved and independent in familiar surroundings.",
    src: "/support-older-people.jpg",
    feature: true,
  },
  {
    icon: Brain,
    title: "Dementia care & support",
    text: "Familiar routines, clear communication and reassurance for people living with dementia.",
    src: "/dementia-care-support.jpg",
    feature: true,
  },
  {
    icon: Accessibility,
    title: "Physical disability support",
    text: "Assessed support with personal care, mobility, daily routines and participation.",
    src: "/physical-disability-support.jpg",
    feature: true,
  },
  {
    icon: Sparkles,
    title: "Mental health & wellbeing",
    text: "Practical, personal and emotional support at home within our homecare scope.",
    src: "/mental-health-wellbeing.jpg",
    feature: true,
  },
  {
    icon: Baby,
    title: "Children & young people",
    text: "Person-centred support planned with the young person, their family and involved professionals.",
    src: "/children-young-people.jpg",
    feature: true,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-cream/60">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Our services</p>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
                Support shaped around <em className="italic font-light">the person</em>.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed">
                People don't experience care needs in neat categories. We assess the whole
                situation before agreeing a service then record support in an individual
                care plan with clear responsibilities and review arrangements.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Featured cards with imagery */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {services.filter((s,i) => s.feature).map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href="#" className="group block card-soft overflow-hidden h-full">
                <div className="aspect-4/3 overflow-hidden">
                  <Image
                    src={s.src}
                    alt={s.title}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blush text-primary flex items-center justify-center">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition -translate-y-1 group-hover:translate-y-0" />
                  </div>
                  <h3 className="mt-4 text-xl text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Compact tiles */}
        <div className="grid md:grid-cols-3 gap-5">
          {services.filter((s,i) => !s.feature).map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href="#" className="group flex gap-4 p-6 card-soft h-full">
                <div className="w-10 h-10 rounded-lg bg-blush text-primary flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm text-primary font-medium transition-all group-hover:gap-2">
                    Explore →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a href="#all-services" className="btn-primary">View all services</a>
            <a href="#assessment" className="btn-outline">Ask if we can support you</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
