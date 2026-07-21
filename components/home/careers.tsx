'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import careers from "@/assets/careers.jpg";
import Reveal from "./reveal";

export function Careers() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="careers" ref={ref} className="py-24 lg:py-32 bg-cream/60 relative overflow-hidden">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-5/6 rounded-4xl overflow-hidden">
            <motion.img
              style={{ y }}
              src='/careers.jpg'
              alt="Care workers taking part in a practical training session."
              width={1200}
              height={900}
              loading="lazy"
              className="absolute inset-0 w-full h-[120%] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-gold text-gold-foreground rounded-2xl p-5 shadow-xl max-w-55 hidden md:block">
            <p className="font-serif text-3xl">Join us</p>
            <p className="text-xs mt-1 opacity-85">Warm, skilled and accountable care work.</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Careers</p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
              Care work that is <em className="italic font-light">warm, skilled and accountable</em>.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The quality of care depends on the people who provide it. We look for care workers
              who are respectful, dependable, observant and willing to learn.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              In return, staff receive appropriate induction and supervision, and the training
              and support needed for their role.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#careers-more" className="btn-primary">Explore careers</a>
              <a href="#recruit" className="btn-outline">How we recruit & prepare staff</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
