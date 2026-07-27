import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import type { StaticImageData } from "next/image";

import Reveal from "./home/reveal";
import HeroParallax from "./content/hero-parallax";
import FAQItem from "./content/faq-item";
import type { PageContent } from "@/constants/pages";
import { pageContents } from "@/constants/pages";

// Static image imports must point at real files via a relative or alias path.
// A leading-slash path like "/hero-home.jpg" is NOT a valid module specifier.
import heroHome from "@/public/hero-home.jpg";
import assessment from "@/public/assessment.jpg";
import serviceDaily from "@/public/service-daily.jpg";
import serviceOlder from "@/public/service-older.jpg";
import serviceDementia from "@/public/service-dementia.jpg";
import careers from "@/public/careers.jpg";

// NOTE: ideally store the image on each page object in constants/pages
// (e.g. `page.heroImage`) instead of matching on the URL string here.
function heroImageFor(url: string): StaticImageData {
  if (url.includes("dementia")) return serviceDementia;
  if (url.includes("older-people")) return serviceOlder;
  if (
    url.includes("personal-care") ||
    url.includes("companionship") ||
    url.includes("daily")
  )
    return serviceDaily;
  if (
    url.includes("how-care-begins") ||
    url.includes("assessment") ||
    url.includes("review")
  )
    return assessment;
  if (url.includes("children") || url.includes("young")) return careers;
  return heroHome;
}

export function ContentPage({ page }: { page: PageContent }) {
  const hero = heroImageFor(page.url);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero (client island for the parallax scroll) */}
        <HeroParallax image={hero}>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs md:text-sm opacity-90">
            <ol className="flex flex-wrap items-center gap-2">
              {page.breadcrumb.map((c, i) => {
                const isLast = i === page.breadcrumb.length - 1;
                return (
                  <li key={c.to} className="flex items-center gap-2">
                    {isLast ? (
                      <span aria-current="page" className="opacity-80">
                        {c.label}
                      </span>
                    ) : (
                      <>
                        <Link href={c.to} className="hover:text-gold transition-colors">
                          {c.label}
                        </Link>
                        <span className="opacity-50">/</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <p className="eyebrow text-gold">{page.category}</p>

          <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
            {page.heroHeading}
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-primary-foreground/85 leading-relaxed">
            {page.intro}
          </p>
        </HeroParallax>

        {/* Intro strip */}
        <section className="py-10 border-b border-border bg-cream/50">
          <div className="container-x grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="eyebrow">Who this is for</p>
              <p className="mt-2 text-muted-foreground leading-relaxed">{page.audience}</p>
            </div>
            <div>
              <p className="eyebrow">What you will learn</p>
              <p className="mt-2 text-muted-foreground leading-relaxed">{page.intent}</p>
            </div>
            <div>
              <p className="eyebrow">Speak with us</p>
              <a
                href="tel:01156812514"
                className="mt-2 inline-flex items-center gap-2 text-primary font-medium"
              >
                <Phone className="w-4 h-4" /> 0115 681 2514
              </a>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="py-20 md:py-28">
          <div className="container-x grid lg:grid-cols-12 gap-12">
            <aside className="md:col-span-3 md:sticky md:top-32 md:self-start hidden md:block">
              <p className="eyebrow">On this page</p>
              <ul className="mt-4 space-y-2 text-sm">
                {page.sections.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#s-${i}`}
                      className="text-muted-foreground hover:text-primary transition-colors block py-1 border-l-2 border-border hover:border-primary pl-3"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}

                {page.faqs.length > 0 && (
                  <li>
                    <a
                      href="#faqs"
                      className="text-muted-foreground hover:text-primary transition-colors block py-1 border-l-2 border-border hover:border-primary pl-3"
                    >
                      Common questions
                    </a>
                  </li>
                )}
              </ul>
            </aside>

            <div className="md:col-span-9 space-y-14">
              {page.sections.map((s, i) => (
                <Reveal key={i}>
                  <article id={`s-${i}`} className="scroll-mt-32">
                    <h2 className="text-2xl md:text-3xl text-primary">{s.heading}</h2>
                    {s.text && (
                      <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                        {s.text}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related / child pages */}
        <ChildPagesGrid url={page.url} />

        {/* FAQ */}
        {page.faqs.length > 0 && (
          <section id="faqs" className="py-20 md:py-28 bg-cream/60 scroll-mt-32">
            <div className="container-x max-w-4xl">
              <Reveal>
                <p className="eyebrow">Answers</p>
                <h2 className="mt-4 text-3xl md:text-5xl text-primary leading-[1.1]">
                  Frequently asked <em className="italic font-light">questions</em>.
                </h2>
              </Reveal>

              <div className="mt-10 divide-y divide-border border-y border-border">
                {page.faqs.map((f, i) => (
                  <FAQItem key={i} q={f.q} a={f.a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTAs */}
        {page.ctas.length > 0 && (
          <section className="py-20 md::py-28 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden>
              <div className="absolute -top-32 -left-20 w-125 h-125 rounded-full bg-gold blur-3xl" />
            </div>

            <div className="container-x relative max-w-3xl text-center">
              <Reveal>
                <p className="eyebrow text-gold">Next step</p>

                <h2 className="mt-4 text-3xl md:text-5xl leading-[1.1]">
                  Ready to take the <em className="italic font-light">next step</em>?
                </h2>

                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Every enquiry begins with a conversation — no commitment, no pressure.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {page.ctas.map((c, i) => {
                    const primary = c.kind === "Primary";
                    // Use the CTA's own target if provided, else fall back.
                

                    return (
                      <a
                        key={i}
                       
                        className={
                          primary
                            ? "inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-gold/90 transition"
                            : "inline-flex items-center gap-2 border border-primary-foreground/40 rounded-full px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition"
                        }
                      >
                        {c.label} <ArrowRight className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function ChildPagesGrid({ url }: { url: string }) {
  const hub = url.replace(/\/$/, "");

  const children = Object.values(pageContents).filter((p) => {
    if (p.url === url) return false;
    if (!p.url.startsWith(hub + "/")) return false;
    // direct children only (one segment deeper)
    const rest = p.url.slice(hub.length + 1).replace(/\/$/, "");
    return !rest.includes("/");
  });

  if (children.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-cream/40">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Explore</p>
          <h2 className="mt-4 text-3xl md:text-5xl text-primary leading-[1.1] max-w-3xl">
            More on <em className="italic font-light">this topic</em>.
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {children.map((c, i) => (
            <Reveal key={c.url} delay={i * 0.05}>
              <Link
                href={c.url.replace(/\/$/, "")}
                className="group block card-soft p-7 h-full"
              >
                <p className="eyebrow text-gold">{c.category}</p>

                <h3 className="mt-3 text-xl text-foreground group-hover:text-primary transition-colors">
                  {c.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {c.intro}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
