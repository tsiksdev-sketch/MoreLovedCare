'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Heart path (viewBox 0 0 100 100). Adjust if you want a different heart style.
  const heartPath = "M50 87.5 C25 70 12.5 55 12.5 38 C12.5 25 22 17.5 33 17.5 C40 17.5 45.5 21.2 50 27 C54.5 21.2 60 17.5 67 17.5 C78 17.5 87.5 25 87.5 38 C87.5 55 75 70 50 87.5 Z";

  return (
    <section ref={ref} className="relative  pt-35 pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 bg-cream" />
      <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-blush blur-3xl opacity-60 -z-10" />
      <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-accent blur-3xl opacity-50 -z-10" />

      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div style={{ y: textY, opacity }} className="lg:col-span-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-2"
          >
            Home care in Nottingham & Nottinghamshire
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-primary"
          >
            Care that helps<br />
            <em className="italic font-light text-foreground/85">everyday life</em><br />
            remain your own.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            MoreLoved Care provides assessed care and support in people's own homes personal care,
            daily routines, medication, mobility, wellbeing and meaningful participation, tailored to
            your needs, choices and agreed care plan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#assessment" className="btn-primary">
              Request a care assessment <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#referral" className="btn-outline">
              Professional referral
            </a>
            <a
              href="tel:01156812514"
              className="inline-flex items-center gap-2 text-primary font-medium ml-2"
            >
              <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              0115 681 2514
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex items-start gap-3 max-w-lg text-sm text-muted-foreground border-l-2 border-gold pl-4"
          >
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p>
              Registered with the <strong className="text-foreground">Care Quality Commission</strong> as
              a homecare agency for Personal care. An initial conversation does not commit you to a service.
            </p>
          </motion.div>
        </motion.div>

        {/* Heart-clipped parallax image */}
        <div className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-4/5 lg:aspect-5/6 overflow-hidden rounded-4xl shadow-2xl"
          >
            {/* SVG does the clipping + border */}
            <svg
              viewBox="0 0 100 115"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <clipPath id="heartClip">
                  <path d={heartPath} />
                </clipPath>
              </defs>

              {/* Border */}
              <path
                d={heartPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="4.5"
                vectorEffect="non-scaling-stroke"
                className="text-gold"
              />

              {/* Image clipped to heart */}
              <image
                href="hero-home.jpg"
                x="0"
                y="0"
                width="100"
                height="115"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#heartClip)"
              />

              {/* Overlay gradient (keeps your original look) */}
              <rect
                x="0"
                y="0"
                width="100"
                height="115"
                fill="url(#overlayGrad)"
                opacity="1"
                clipPath="url(#heartClip)"
              />
              <defs>
                <linearGradient id="overlayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
                  <stop offset="45%" stopColor="rgba(0,0,0,0.00)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.00)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Parallax effect is applied as a motion wrapper using CSS transform on the SVG */}
            <motion.div
              style={{ y, scale }}
              className="absolute inset-0"
            />
          </motion.div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="hidden md:block absolute -bottom-8 -left-8 bg-card border border-border rounded-2xl p-5 shadow-xl max-w-60"
          >
            <p className="eyebrow text-[0.65rem]">CQC rated</p>
            <p className="mt-2 text-4xl font-serif text-primary">Good</p>
            <p className="mt-1 text-xs text-muted-foreground leading-snug">
              Across Safe, Effective, Caring, Responsive and Well led.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="hidden md:flex absolute -top-6 -right-4 bg-gold text-gold-foreground rounded-full h-24 w-24 items-center justify-center text-center text-xs font-medium leading-tight shadow-lg"
          >
            From Us<br />to You
          </motion.div>
        </div>
      </div>
    </section>
  );
}