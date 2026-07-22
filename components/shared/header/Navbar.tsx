'use client'

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const nav = [
  { label: "Care & Support", href: "#services" },
  { label: "How Care Begins", href: "#how" },
  { label: "For Families", href: "#families" },
  { label: "For Professionals", href: "#professionals" },
  { label: "Quality & Safety", href: "#quality" },
  { label: "About", href: "#about" },
  { label: "Advice", href: "#advice" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <span className="hidden md:inline opacity-80">
            Compassionate home care in Nottingham & Nottinghamshire
          </span>
          <div className="flex items-center gap-4 md:gap-6 opacity-90">
            <a href="#existing" className="hover:opacity-100 hidden sm:inline">Existing clients</a>
            <a href="#careers" className="hover:opacity-100 hidden sm:inline">Careers</a>
            <a href="#assessment" className="hover:opacity-100 hidden sm:inline">Contact</a>
            <a href="tel:01156812514" className="inline-flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5" /> 0115 681 2514
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex items-center justify-between ">
          <Link href="/" className="flex items-center gap-2">
            <Image src='/moreloved-logo.png' height={100} width={100} alt="MoreLoved Care" className="h-20 w-30 " />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#assessment" className="btn-outline text-sm py-2! px-4!">Refer</a>
            <a href="#assessment" className="btn-primary text-sm py-2! px-4!">Request assessment</a>
          </div>

          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container-x py-4 flex flex-col gap-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-foreground/80 border-b border-border/60"
                >
                  {n.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <a href="#assessment" className="btn-outline flex-1 text-sm">Refer</a>
                <a href="#assessment" className="btn-primary flex-1 text-sm">Assessment</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
