import { Quote } from "lucide-react";
import Reveal from "./reveal";

const quotes = [
  { text: "The carer is kind, respectful and always takes the time to do things the way I like. It makes such a difference to stay in my own home.", who: "Peter", context: "Person receiving care, Nottingham" },
  { text: "We finally have a team we can trust. Communication is clear, visits are on time, and Mum feels genuinely listened to.", who: "Sarah", context: "Family member" },
  { text: "Their assessment was thorough and honest about what they could safely provide. Discharge went smoothly for our patient.", who: "NHS Discharge Coordinator", context: "Professional referrer" },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-cream/60">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="eyebrow">What people say</p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
              Voices from <em className="italic font-light">the people we support</em>.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <Reveal key={q.who} delay={i * 0.1}>
              <figure className="h-full p-8 rounded-3xl bg-card border border-border relative">
                <Quote className="w-8 h-8 text-gold" />
                <blockquote className="mt-4 text-lg leading-relaxed text-foreground/90 font-serif italic">
                  "{q.text}"
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">{q.who}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{q.context}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            Testimonials are only published where the wording has been verified and the person
            has given appropriate permission for the agreed use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
