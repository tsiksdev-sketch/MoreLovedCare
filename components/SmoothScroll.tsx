"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const smootherRef = useRef<ScrollSmoother | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const BASE_SMOOTH = 1.6; // increase for smoother feel

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: BASE_SMOOTH,
      effects: true,
      normalizeScroll: true,

      // Keep only options that exist in your typings.
      // If this also errors, delete this line.
      ignoreMobileResize: true,
    });

    smootherRef.current = smoother;

    const refresh = () => ScrollTrigger.refresh();

    const onImgLoad = () => refresh();
    const imgs = Array.from(document.images);

    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImgLoad, { once: true });
    });

    window.addEventListener("load", refresh);

    const content = document.getElementById("smooth-content");
    if (content) {
      roRef.current = new ResizeObserver(() => refresh());
      roRef.current.observe(content);
    }

    return () => {
      window.removeEventListener("load", refresh);
      roRef.current?.disconnect();
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!smootherRef.current) return;

    requestAnimationFrame(() => {
      try {
        smootherRef.current?.scrollTo(0, false);
      } catch {
        // ignore
      }

      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}