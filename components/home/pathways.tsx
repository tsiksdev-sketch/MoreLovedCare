
import { Home, Briefcase, ArrowRight } from "lucide-react";
import Reveal from "./reveal";

export function Pathways() {
  return (
    <section id="families" className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -left-20 w-125 h-125 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="container-x relative">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="eyebrow text-gold!">Find the right route</p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Two ways to <em className="italic font-light">begin</em>.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="group rounded-3xl bg-primary-foreground/5 backdrop-blur border border-primary-foreground/15 p-8 lg:p-10 h-full transition hover:bg-primary-foreground/10">
              <Home className="w-8 h-8 text-gold" />
              <h3 className="mt-6 text-2xl md:text-3xl">I am looking for care</h3>
              <p className="mt-3 text-primary-foreground/80 leading-relaxed">
                For yourself or someone close to you. Learn about current services,
                how assessment works, and what to expect before care begins. A short
                enquiry does not commit you to anything.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#assessment" className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-5 py-3 text-sm font-medium hover:bg-gold/90 transition">
                  Request a care assessment <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#families-info" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
                  Information for families →
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div id="professionals" className="group rounded-3xl bg-primary-foreground/5 backdrop-blur border border-primary-foreground/15 p-8 lg:p-10 h-full transition hover:bg-primary-foreground/10">
              <Briefcase className="w-8 h-8 text-gold" />
              <h3 className="mt-6 text-2xl md:text-3xl">Making a professional referral</h3>
              <p className="mt-3 text-primary-foreground/80 leading-relaxed">
                For social workers, NHS professionals and commissioners. Review our
                current scope, quality arrangements and referral requirements then
                submit relevant documents securely.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#referral" className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-5 py-3 text-sm font-medium hover:bg-gold/90 transition">
                  Make a referral <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#professionals-info" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
                  Commissioner information →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
