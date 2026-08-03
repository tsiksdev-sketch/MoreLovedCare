"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Phone, Mail, Clock, MapPin, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react"
import Reveal from "./home/reveal"
import type { PageContent } from "@/constants/pages"
import { fieldSets, formTitles, validateForm, type FormKind, type FormValues } from "@/lib/forms"

export function FormPage({ page, kind }: { page: PageContent; kind: FormKind }) {
  const fields = fieldSets[kind]
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const urgent = kind === "safeguarding"

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    const formEl = e.currentTarget
    const data = new FormData(formEl)
    const values: FormValues = {}
    for (const field of fields) {
      values[field.name] = String(data.get(field.name) ?? "")
    }

    // Client-side validation using the same rules the server enforces.
    const nextErrors = validateForm(kind, values)
    if (!agreed) nextErrors.privacy = "Please confirm you've read the privacy notice."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFormError("Please check the highlighted fields.")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...values }),
      })
      const result = await res.json()

      if (!res.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors)
        setFormError(result.error ?? "Something went wrong. Please try again.")
        return
      }

      setSent(true)
      formEl.reset()
      setAgreed(false)
    } catch {
      setFormError("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <main>
        {/* Hero */}
        <section className={`relative pt-24 pb-16 overflow-hidden ${urgent ? "bg-primary text-primary-foreground" : ""}`}>
          <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
            <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-gold blur-3xl" />
          </div>
          <div className="relative container-x">
            <nav
              aria-label="Breadcrumb"
              className={`text-xs md:text-sm ${urgent ? "text-primary-foreground/80" : "text-muted-foreground"}`}
            >
              <ol className="flex items-center gap-2">
                {page.breadcrumb.map((c, i) => {
                  const isLast = i === page.breadcrumb.length - 1
                  return (
                    <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                      {isLast ? (
                        <span>{c.label}</span>
                      ) : (
                        <>
                          <Link href={c.to} className={urgent ? "hover:text-gold" : "hover:text-primary"}>
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
            <p className={`mt-8 eyebrow ${urgent ? "text-gold!" : "text-gold"}`}>{page.category}</p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={`mt-4 text-4xl md:text-6xl leading-[1.05] max-w-4xl text-balance ${urgent ? "" : "text-primary"}`}
            >
              {page.heroHeading}
            </motion.h1>
            <p
              className={`mt-6 max-w-2xl leading-relaxed text-lg ${
                urgent ? "text-primary-foreground/85" : "text-muted-foreground"
              }`}
            >
              {page.intro}
            </p>

            {urgent && (
              <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold text-gold-foreground px-5 py-3 text-sm font-medium">
                <ShieldAlert className="w-4 h-4" /> If someone is in immediate danger, call 999.
              </div>
            )}
          </div>
        </section>

        {/* Split: form + supporting info */}
        <section className="py-16 lg:py-24">
          <div className="container-x grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                {sent ? (
                  <div className="card-soft p-8 md:p-10" role="status" aria-live="polite">
                    <div className="flex items-center gap-3 text-primary">
                      <CheckCircle2 className="w-8 h-8 text-gold" />
                      <h2 className="text-2xl md:text-3xl">Message sent</h2>
                    </div>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Thank you — your {formTitles[kind].toLowerCase()} has been sent to our team. We aim to respond
                      within one working day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="btn-primary text-sm mt-6 inline-flex items-center gap-2"
                    >
                      Send another message <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="card-soft p-8 md:p-10 space-y-5">
                    <p className="eyebrow">Send a secure message</p>
                    <h2 className="text-2xl md:text-3xl text-primary">Tell us what&apos;s happening</h2>

                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      {fields.map((f, i) => {
                        const err = errors[f.name]
                        const fieldClass = `mt-1.5 w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                          err
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                            : "border-border focus:border-primary focus:ring-primary/20"
                        }`
                        return (
                          <label
                            key={f.name}
                            className={`block ${f.textarea || i === fields.length - 1 ? "md:col-span-2" : ""}`}
                          >
                            <span className="text-sm text-foreground/80">
                              {f.label} {f.required && <span className="text-gold">*</span>}
                            </span>
                            {f.textarea ? (
                              <textarea
                                name={f.name}
                                rows={5}
                                placeholder={f.placeholder}
                                aria-invalid={!!err}
                                className={fieldClass}
                              />
                            ) : (
                              <input
                                name={f.name}
                                type={f.type ?? "text"}
                                placeholder={f.placeholder}
                                aria-invalid={!!err}
                                className={fieldClass}
                              />
                            )}
                            {err && <span className="mt-1 block text-xs text-destructive">{err}</span>}
                          </label>
                        )
                      })}
                    </div>

                    <div>
                      <label className="flex items-start gap-3 text-sm text-muted-foreground pt-2">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          aria-invalid={!!errors.privacy}
                          className="mt-1 accent-primary"
                        />
                        <span>
                          I&apos;ve read the{" "}
                          <Link href="#" className="text-primary underline underline-offset-2">
                            privacy notice
                          </Link>{" "}
                          and understand how my information will be used.
                        </span>
                      </label>
                      {errors.privacy && <span className="mt-1 block text-xs text-destructive">{errors.privacy}</span>}
                    </div>

                    {formError && (
                      <p className="text-sm text-destructive" role="alert">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary text-sm inline-flex items-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Send securely"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </Reveal>
            </div>

            <aside className="lg:col-span-5 space-y-4">
              <Reveal>
                <div className="card-soft p-6 bg-primary text-primary-foreground">
                  <p className="eyebrow text-gold!">Prefer to talk?</p>
                  <a href="tel:01156812514" className="mt-3 flex items-center gap-3 text-2xl font-serif">
                    <Phone className="w-6 h-6 text-gold" /> 0115 681 2514
                  </a>
                  <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">
                    Mon–Fri 9am–5pm. Out-of-hours coordinator for existing clients.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="card-soft p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="eyebrow">Email</p>
                      <a href="mailto:admin@morelovedcare.co.uk" className="text-sm text-foreground/80">
                        admin@morelovedcare.co.uk
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="eyebrow">Serving</p>
                      <p className="text-sm text-foreground/80">Nottingham & agreed areas of Nottinghamshire</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="eyebrow">Typical response</p>
                      <p className="text-sm text-foreground/80">Within one working day</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {page.sections.slice(0, 3).map((s, i) => (
                <Reveal key={i}>
                  <div className="card-soft p-6">
                    <p className="eyebrow">{s.heading}</p>
                    {s.text && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>}
                  </div>
                </Reveal>
              ))}
            </aside>
          </div>
        </section>

        {/* Long-form context below */}
        {page.sections.length > 3 && (
          <section className="py-16 lg:py-24 bg-background border-t border-border">
            <div className="container-x max-w-4xl space-y-10">
              <Reveal>
                <h2 className="text-3xl md:text-4xl text-primary">Good to know before you send</h2>
              </Reveal>
              {page.sections.slice(3).map((s, i) => (
                <Reveal key={i}>
                  <article className="flex items-start gap-5">
                    <CheckCircle2 className="w-6 h-6 text-gold mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl text-primary">{s.heading}</h3>
                      {s.text && <p className="mt-2 text-muted-foreground leading-relaxed">{s.text}</p>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {page.faqs.length > 0 && (
          <section className="py-20 bg-cream/70">
            <div className="container-x max-w-4xl">
              <Reveal>
                <p className="eyebrow">Answers</p>
                <h2 className="mt-3 text-3xl md:text-5xl text-primary leading-[1.1]">
                  Common <em className="italic font-light">questions</em>.
                </h2>
              </Reveal>
              <div className="mt-10 space-y-3">
                {page.faqs.map((f, i) => (
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
        )}
      </main>
    </div>
  )
}
