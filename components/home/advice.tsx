import Reveal from "./reveal";
import { BookOpen, ClipboardList, HeartHandshake, PoundSterling, ArrowRight } from "lucide-react";

const guides = [
  { icon: BookOpen, title: "Choosing home care", text: "Questions to ask about registration, assessment, staff, costs and complaints." },
  { icon: ClipboardList, title: "Preparing for an assessment", text: "What to think about routines, priorities, current support and changing needs." },
  { icon: HeartHandshake, title: "Hospital discharge checklist", text: "Medication, equipment, home access, meals, follow-up and support arrangements." },
  { icon: PoundSterling, title: "Direct payments", text: "Choosing a provider and agreeing support with a personal budget or direct payment." },
];

export function Advice() {
  return (
    <section id="advice" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Advice & resources</p>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
                Clear information <em className="italic font-light">before you decide</em>.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed">
                Choosing care can involve unfamiliar terms, urgent decisions and questions about
                cost, safety and responsibility. Our hub helps you prepare.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {guides.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <a href="#" className="group block p-7 card-soft h-full">
                <div className="w-11 h-11 rounded-xl bg-blush text-primary flex items-center justify-center">
                  <g.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 text-lg text-foreground">{g.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{g.text}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm text-primary font-medium transition-all group-hover:gap-2">
                  Read guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
