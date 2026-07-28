"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import Image, { type StaticImageData } from "next/image"
import { ArrowRight, ArrowUpRight, Phone, Sparkles } from "lucide-react"
import Reveal from "./home/reveal"
import type { PageContent } from "@/constants/pages"

// Static imports resolve to StaticImageData ({ src, width, height, blurDataURL }),
// which next/image consumes directly for automatic sizing + blur placeholder.
import heroHome from "@/public/hero-home.jpg"
import assessment from "@/public/assessment.jpg"
import serviceDaily from "@/public/service-daily.jpg"
import serviceOlder from "@/public/service-older.jpg"
import serviceDementia from "@/public/service-dementia.jpg"
import careers from "@/public/careers.jpg"

const images: StaticImageData[] = [heroHome, assessment, serviceDaily, serviceOlder, serviceDementia, careers]

function pickImage(url: string): StaticImageData {
  let h = 0
  for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) >>> 0
  return images[h % images.length]
}

// Rotate between 3 unique layouts based on URL hash
function pickVariant(url: string): 0 | 1 | 2 {
  let h = 0
  for (let i = 0; i < url.length; i++) h = (h * 17 + url.charCodeAt(i)) >>> 0
  return (h % 3) as 0 | 1 | 2
}

export function LeafPage({ page }: { page: PageContent }) {
  const variant = pickVariant(page.url)
  if (variant === 0) return <SplitEditorial page={page} />
  if (variant === 1) return <IndexedManifest page={page} />
  return <StackedCards page={page} />
}

/* ---------------------------------------------------------------
 * Variant A: Split editorial with sticky imagery + big number index
 * --------------------------------------------------------------- */
function SplitEditorial({ page }: { page: PageContent }) {
  const heroImg = pickImage(page.url)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "-15%"])

  return (
    <div className="min-h-screen bg-cream text-foreground">

      <main>
        {/* Editorial hero */}
        <section className="relative pt-40 pb-24 overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
            <div className="absolute top-24 -right-40 w-180 h-180 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute bottom-0 -left-40 w-130 h-130 rounded-full bg-gold/15 blur-3xl" />
          </motion.div>

          <div className="container-x">
            <Breadcrumbs page={page} tone="dark" />

            <div className="mt-10 grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow text-gold">{page.category}</p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="mt-5 text-4xl md:text-6xl lg:text-7xl text-primary leading-[1.02]"
                >
                  {page.heroHeading}
                </motion.h1>
              </div>
              <div className="lg:col-span-4">
                <p className="text-muted-foreground leading-relaxed border-l-2 border-gold pl-5">{page.intro}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky image + numbered sections */}
        <section className="py-16 lg:py-24 border-y border-border">
          <div className="container-x grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-4/5 overflow-hidden rounded-lg shadow-2xl"
              >
                <Image
                  src={heroImg}
                  alt={page.audience}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                  <p className="eyebrow text-gold!">In practice</p>
                  <p className="mt-2 text-lg leading-snug">{page.audience}</p>
                </div>
              </motion.div>

              <div className="mt-6 card-soft p-5">
                <p className="eyebrow">Talk to us</p>
                <a href="tel:01156812514" className="mt-2 flex items-center gap-2 text-primary font-medium">
                  <Phone className="w-4 h-4" /> 0115 681 2514
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-14">
              {page.sections.map((s, i) => (
                <Reveal key={i}>
                  <article className="group">
                    <div className="flex items-baseline gap-5">
                      <span className="font-serif text-gold text-4xl md:text-5xl leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="mt-4 text-2xl md:text-3xl text-primary">{s.heading}</h2>
                    {s.text && <p className="mt-4 text-muted-foreground leading-relaxed">{s.text}</p>}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {page.faqs.length > 0 && <FAQBlock faqs={page.faqs} />}
        {page.ctas.length > 0 && <CTABand ctas={page.ctas} />}
      </main>
  
    </div>
  )
}

/* ---------------------------------------------------------------
 * Variant B: Indexed manifest — full-bleed dark hero, horizontal ledger
 * --------------------------------------------------------------- */
function IndexedManifest({ page }: { page: PageContent }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div className="min-h-screen bg-background text-foreground">
     
      <main>
        <section
          ref={heroRef}
          className="relative min-h-140 flex items-end bg-primary text-primary-foreground overflow-hidden pt-40 pb-16"
        >
          <motion.div style={{ y }} className="absolute inset-0 opacity-25">
            <div className="absolute top-20 left-1/3 w-150 h-150 rounded-full bg-gold blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-125 h-125 rounded-full bg-cream/30 blur-3xl" />
          </motion.div>

          {/* Ruled paper backdrop */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent 0 47px, rgba(255,255,255,0.6) 47px 48px)",
            }}
            aria-hidden
          />

          <div className="relative container-x">
            <Breadcrumbs page={page} tone="light" />
            <div className="mt-10 grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-2 hidden lg:block">
                <div className="text-gold font-serif text-7xl leading-none">§</div>
                <p className="mt-2 eyebrow text-gold!">Ref · {page.url.split("/").filter(Boolean).slice(-1)[0]}</p>
              </div>
              <div className="lg:col-span-10">
                <p className="eyebrow text-gold!">{page.category}</p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="mt-4 text-4xl md:text-6xl lg:text-7xl leading-[1.02]"
                >
                  {page.heroHeading}
                </motion.h1>
                <p className="mt-6 max-w-3xl text-primary-foreground/85 leading-relaxed text-lg">{page.intro}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ledger row */}
        <section className="border-b border-border bg-cream">
          <div className="container-x grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { k: "For", v: page.audience },
              { k: "You'll learn", v: page.intent },
              { k: "Sections", v: `${page.sections.length} covered` },
              { k: "Call", v: "0115 681 2514" },
            ].map((r, i) => (
              <div key={i} className="py-6 md:px-6 first:md:pl-0">
                <p className="eyebrow">{r.k}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sections as long-form ledger */}
        <section className="py-20 lg:py-28">
          <div className="container-x max-w-4xl">
            {page.sections.map((s, i) => (
              <Reveal key={i}>
                <article className="py-10 border-b border-border last:border-b-0 grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-2">
                    <p className="font-serif text-gold text-3xl">{String(i + 1).padStart(2, "0")}</p>
                  </div>
                  <div className="md:col-span-10">
                    <h2 className="text-2xl md:text-3xl text-primary">{s.heading}</h2>
                    {s.text && <p className="mt-4 text-muted-foreground leading-relaxed">{s.text}</p>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {page.faqs.length > 0 && <FAQBlock faqs={page.faqs} />}
        {page.ctas.length > 0 && <CTABand ctas={page.ctas} />}
      </main>
   
    </div>
  )
}

/* ---------------------------------------------------------------
 * Variant C: Stacked cards — playful floating cards with parallax
 * --------------------------------------------------------------- */
function StackedCards({ page }: { page: PageContent }) {
  const heroImg = pickImage(page.url)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])

  return (
    <div className="min-h-screen bg-cream/60 text-foreground">
  
      <main>
        <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
          <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative z-10">
              <Breadcrumbs page={page} tone="dark" />
              <p className="mt-8 eyebrow text-gold">{page.category}</p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-4 text-4xl md:text-6xl text-primary leading-[1.05]"
              >
                {page.heroHeading}
              </motion.h1>
              <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed text-lg">{page.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="tel:01156812514" className="btn-primary text-sm">
                  <Phone className="w-4 h-4 mr-2 inline" /> 0115 681 2514
                </a>
                <Link href="/contact" className="btn-outline text-sm">
                  Send an enquiry
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-135">
              <motion.div
                style={{ y: imgY }}
                className="absolute top-0 right-0 w-[85%] aspect-4/5 rounded-lg overflow-hidden shadow-2xl"
              >
                <Image
                  src={heroImg}
                  alt={page.audience}
                  fill
                  sizes="(min-width: 1024px) 42vw, 85vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </motion.div>
              <motion.div style={{ y: cardY }} className="absolute bottom-0 left-0 w-[70%] card-soft p-6 shadow-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="eyebrow">Who we help</p>
                    <p className="mt-1 text-sm text-foreground leading-relaxed">{page.audience}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sections as bento cards */}
        <section className="py-16 lg:py-24">
          <div className="container-x">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
              {page.sections.map((s, i) => {
                const wide = i % 5 === 0
                return (
                  <Reveal key={i} delay={i * 0.04} className={wide ? "md:col-span-2" : ""}>
                    <article
                      className={`card-soft p-7 h-full flex flex-col ${
                        i % 4 === 0 ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      <span className="font-serif text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="mt-3 text-xl md:text-2xl leading-snug">{s.heading}</h2>
                      {s.text && (
                        <p
                          className={`mt-4 leading-relaxed text-sm flex-1 ${
                            i % 4 === 0 ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                        >
                          {s.text}
                        </p>
                      )}
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {page.faqs.length > 0 && <FAQBlock faqs={page.faqs} />}
        {page.ctas.length > 0 && <CTABand ctas={page.ctas} />}
      </main>
   
    </div>
  )
}

/* ---------------- Shared ---------------- */

function Breadcrumbs({ page, tone }: { page: PageContent; tone: "light" | "dark" }) {
  const light = tone === "light"
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs md:text-sm ${light ? "text-primary-foreground/85" : "text-muted-foreground"}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {page.breadcrumb.map((c, i) => {
          const isLast = i === page.breadcrumb.length - 1
          return (
            <li key={c.to} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="opacity-80">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.to} className={light ? "hover:text-gold" : "hover:text-primary"}>
                    {c.label}
                  </Link>
                  <span className="opacity-40">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function FAQBlock({ faqs }: { faqs: PageContent["faqs"] }) {
  return (
    <section className="py-20 lg:py-28 bg-cream/70 border-t border-border">
      <div className="container-x max-w-4xl">
        <Reveal>
          <p className="eyebrow">Answers</p>
          <h2 className="mt-4 text-3xl md:text-5xl text-primary leading-[1.1]">
            Frequently asked <em className="italic font-light">questions</em>.
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group card-soft p-6 cursor-pointer">
              <summary className="flex items-start justify-between gap-6 list-none">
                <span className="text-lg text-foreground group-hover:text-primary transition">{f.q}</span>
                <span className="text-gold text-2xl leading-none transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABand({ ctas }: { ctas: PageContent["ctas"] }) {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -left-20 w-125 h-125 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-125 h-125 rounded-full bg-cream/40 blur-3xl" />
      </div>
      <div className="container-x relative max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow text-gold!">Next step</p>
          <h2 className="mt-4 text-3xl md:text-5xl leading-[1.1]">
            Ready to take the <em className="italic font-light">next step</em>?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {ctas.map((c, i) => {
              const primary = c.kind === "Primary"
              return (
                <Link
                  key={i}
                  href={"/contact"}
                  className={
                    primary
                      ? "inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-gold/90 transition"
                      : "inline-flex items-center gap-2 border border-primary-foreground/40 rounded-full px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition"
                  }
                >
                  {c.label} {primary ? <ArrowRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </Link>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
