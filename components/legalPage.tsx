'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Phone } from "lucide-react";
import type { PageContent } from "@/constants/pages";

export function LegalPage({ page }: { page: PageContent }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll<HTMLElement>("[data-legal-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
     
      <main>
        {/* Compact document-style hero */}
        <section className="pt-36 pb-12 border-b border-border bg-cream">
          <div className="container-x">
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
              <ol className="flex items-center gap-2">
                {page.breadcrumb.map((c, i) => {
                  const isLast = i === page.breadcrumb.length - 1;
                  return (
                    <li key={c.to} className="flex items-center gap-2">
                      {isLast ? <span>{c.label}</span> : (
                        <>
                          <Link href={c.to} className="hover:text-primary">{c.label}</Link>
                          <span className="opacity-40">/</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className="mt-6 flex items-start gap-5">
              <div className="hidden md:flex w-14 h-14 rounded-lg bg-primary/10 items-center justify-center text-primary">
                <FileText className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="eyebrow text-gold">{page.category}</p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-3 text-3xl md:text-5xl text-primary leading-[1.1]"
                >
                  {page.heroHeading}
                </motion.h1>
                <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">{page.intro}</p>
                <p className="mt-4 text-xs text-muted-foreground uppercase tracking-wider">
                  Last reviewed: July 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Two-column doc */}
        <section className="py-16">
          <div className="container-x grid lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32">
                <p className="eyebrow">Contents</p>
                <ol className="mt-4 space-y-1 text-sm">
                  {page.sections.map((s, i) => (
                    <li key={i}>
                      <a
                        href={`#legal-${i}`}
                        className={`block py-1.5 pl-3 border-l-2 transition ${
                          active === i
                            ? "border-primary text-primary font-medium"
                            : "border-border text-muted-foreground hover:text-primary hover:border-primary/60"
                        }`}
                      >
                        <span className="text-gold mr-2 font-mono text-xs">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 card-soft p-5">
                  <p className="eyebrow">Questions?</p>
                  <a href="tel:01156812514" className="mt-2 flex items-center gap-2 text-primary text-sm font-medium">
                    <Phone className="w-4 h-4" /> 0115 681 2514
                  </a>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 max-w-3xl">
              {page.sections.map((s, i) => (
                <article
                  key={i}
                  id={`legal-${i}`}
                  data-legal-section
                  data-idx={i}
                  className="py-8 border-b border-border last:border-b-0 scroll-mt-32"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-xl md:text-2xl text-primary">{s.heading}</h2>
                  </div>
                  {s.text && (
                    <p className="mt-3 text-muted-foreground leading-relaxed">{s.text}</p>
                  )}
                </article>
              ))}

              {page.faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <p className="eyebrow">Clarifications</p>
                  <div className="mt-4 space-y-3">
                    {page.faqs.map((f, i) => (
                      <details key={i} className="group card-soft p-5 cursor-pointer">
                        <summary className="flex items-start justify-between gap-4 list-none">
                          <span className="text-base text-foreground group-hover:text-primary transition">
                            {f.q}
                          </span>
                          <span className="text-gold text-xl leading-none transition group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
