'use client'

import { useEffect, useState } from "react";
import {  ChevronUp } from "lucide-react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const max = ScrollTrigger.maxScroll(window);
      const y =
        ScrollSmoother.get?.()?.scrollTop() ??
        window.scrollY ??
        document.documentElement.scrollTop;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const id = window.setInterval(update, 100); // ScrollSmoother virtualizes scroll
    return () => {
      window.removeEventListener("scroll", update);
      window.clearInterval(id);
    };
  }, []);
  const handleClick = () => {
    const smoother = ScrollSmoother.get?.();
    if (smoother) {
      gsap.to(smoother, { scrollTop: 0, duration: 1.1, ease: "power3.inOut" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const size = 52;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);
  const visible = progress > 0.02;
  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-6 md:right-6 md:grid hidden right-10 z-50  place-items-center rounded-full bg-background/80 backdrop-blur-md shadow-soft border border-border transition-all duration-300 hover:scale-110 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
      </svg>
      <ChevronUp className="h-5 w-5 text-primary" strokeWidth={2.4} />
    </button>
  );
}