"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

// Client island: only the parallax scroll behaviour needs to run on the client.
// The text content is passed in as children from the Server Component so it
// stays in the server-rendered HTML.
export default function HeroParallax({
  image,
  children,
}: {
  image: StaticImageData;
  children: ReactNode;
}) {
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section ref={heroRef} className="relative md:mt-30 h-[68vh] min-h-130 overflow-hidden">
      <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
        {/*
          Pass the imported static image object directly to `src`. Next.js then
          supplies width, height, and an automatic blur placeholder. `fill` makes
          it cover the parallax container, `sizes` serves the right resolution,
          and `priority` is used because this is the above-the-fold hero.
        */}
        <Image
          src={image}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/40 to-primary"
      />

      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-20 w-130 h-130 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative z-10 h-full container-x flex flex-col justify-end pb-16 pt-32 text-primary-foreground">
        {children}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/80 z-10"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
