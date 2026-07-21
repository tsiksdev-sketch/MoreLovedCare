'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./reveal";


export function FromUsToYou() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      <motion.div
        style={{ y }}
        aria-hidden
        className="absolute -right-40 top-10 text-[26rem] font-serif text-blush/60 leading-none select-none pointer-events-none"
      >
        &ldquo;
      </motion.div>

      <div className="container-x grid lg:grid-cols-12 gap-12 items-start relative">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Our promise</p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
              From Us <em className="italic font-light">to You</em>.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/85">
          <Reveal delay={0.1}>
            <p>
              "From Us to You" is more than a line beneath our name. It describes how we
              believe care should move from a provider to the person receiving it 
              thoughtfully, respectfully and with accountability at every stage.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              We begin by listening to what matters to you. We assess needs and risks with you,
              prepare the right support, and make sure staff understand the agreed care plan
              before care begins.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-primary font-serif italic text-2xl leading-snug border-l-2 border-gold pl-6">
              Care should not take over a person's life. It should help the person remain
              involved in their routines, decisions, relationships and community.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <a href="#story" className="btn-ghost">
              Read our story and ethos →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
