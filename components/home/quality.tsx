import { ClipboardCheck, GraduationCap, AlertCircle, RefreshCw } from "lucide-react";
import Reveal from "./reveal";

const items = [
  { icon: ClipboardCheck, title: "Care based on assessed needs", text: "Care plans set out what matters to the person, what has been agreed, how risks should be managed and what staff must record or escalate." },
  { icon: GraduationCap, title: "Prepared for the role", text: "Training is matched to the role. For higher-risk tasks, competence is demonstrated through observation, supervised practice or formal sign-off." },
  { icon: AlertCircle, title: "Concerns lead to action", text: "We review missed visits, medication exceptions, incidents, complaints, safeguarding concerns and staffing risks actions assigned and checked." },
  { icon: RefreshCw, title: "Care changes when circumstances change", text: "Plans and risk assessments are reviewed after significant events and when a person's health, environment or package changes." },
];

export function Quality() {
  return (
    <section id="quality" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">Quality & accountability</p>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
                Warm care needs <em className="italic font-light">clear standards</em>.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Kindness matters, but kindness alone is not enough. People should also be able
                to see how care is assessed, prepared, monitored and improved.
              </p>
              <a href="#quality-more" className="mt-6 inline-block btn-ghost">
                Read about quality and governance →
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08}>
                <div className="p-6 lg:p-7 card-soft h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <it.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 text-lg text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CQC card */}
        <Reveal>
          <div id="cqc" className="mt-16 rounded-3xl bg-blush border border-border p-8 lg:p-12 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="eyebrow">Independently regulated</p>
              <h3 className="mt-3 text-3xl md:text-4xl text-primary">CQC overall rating: <em className="italic">Good</em></h3>
              <p className="mt-4 text-foreground/80 leading-relaxed max-w-2xl">
                MoreLoved Care Ltd is registered with the Care Quality Commission as a homecare
                agency for the regulated activity of Personal care. Rated Good across Safe,
                Effective, Caring, Responsive and Well-led. Inspection published 23 December 2023.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <a href="#cqc-profile" className="btn-primary">View CQC profile</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
