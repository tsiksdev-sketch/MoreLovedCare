import { ShieldCheck, MapPin, Users, Star } from "lucide-react";
import Reveal from "./reveal";


const items = [
  { icon: ShieldCheck, title: "CQC-regulated", text: "Registered to provide Personal care." },
  { icon: Star, title: "Rated Good", text: "Across all five CQC inspection domains." },
  { icon: MapPin, title: "Based in Nottingham", text: "Serving Nottingham & agreed areas." },
  { icon: Users, title: "Private & professional", text: "Individuals, families, NHS & commissioners." },
];

export function TrustBar() {
  return (
    <section className="relative -mt-6 z-10">
      <div className="container-x">
        <Reveal>
          <div className="bg-card rounded-3xl border border-border shadow-xl grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border overflow-hidden">
            {items.map((it) => (
              <div key={it.title} className="p-6 lg:p-7 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-blush text-primary flex items-center justify-center shrink-0">
                  <it.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{it.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
