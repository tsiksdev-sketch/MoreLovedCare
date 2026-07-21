'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Reveal from "./reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: "01", title: "We listen", text: "Tell us what is happening, what matters to the person, and what support may be needed." },
  { n: "02", title: "We assess & plan with you", text: "We consider routines, abilities, preferences, communication, medication, mobility, wellbeing and risk." },
  { n: "03", title: "We prepare", text: "Agreed tasks, visit arrangements, responsibilities, staff competence and contingency information confirmed before care begins." },
  { n: "04", title: "We support", text: "Care workers follow the agreed plan while promoting privacy, dignity, choice and safe participation." },
  { n: "05", title: "We review & remain accountable", text: "Care is reviewed after commencement and when needs, risks or circumstances change." },
];

export function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const ctx = gsap.context(() => {
      const line = container.current!.querySelector<HTMLElement>("[data-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.8,
            },
          }
        );
      }
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -20,
          duration: 0.7,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={container} className="py-24 lg:py-32 relative">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">How care begins</p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
              A clear path from <em className="italic font-light">first conversation</em> to ongoing support.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Care should not begin with uncertainty. We explain what information is needed,
              what we can provide and what will happen before the first visit.
            </p>
            <div className="mt-8 relative rounded-2xl overflow-hidden aspect-4/3">
              <Image
                src='/assessment.jpg'
                alt="A care coordinator listening to a person during a home assessment."
                width={1200}
                height={900}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 relative pl-8">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
          <div data-line className="absolute left-2 top-2 bottom-2 w-px bg-primary origin-top" />

          <div className="space-y-10">
            {steps.map((s) => (
              <div key={s.n} data-step className="relative">
                <span className="absolute -left-[1.85rem] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                <p className="eyebrow text-gold">{s.n}</p>
                <h3 className="mt-2 text-2xl md:text-3xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed max-w-lg">{s.text}</p>
              </div>
            ))}
            <div className="pl-0 pt-2 flex flex-wrap gap-3">
              <a href="#how-more" className="btn-primary">See how care begins</a>
              <a href="#prepare" className="btn-outline">Prepare for a care assessment</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
