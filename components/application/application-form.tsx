"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  MAX_EMPLOYERS,
  STEPS,
  validateAll,
  validateStep,
  type ApplicationData,
  type FieldErrors,
} from "@/lib/application";
import type { F } from "./form-fields";
import { StepDeclare, StepEducation, StepEmployment, StepFinal, StepPersonal, StepRefs, StepRole } from "./steps";
import HeroParallax from "../content/hero-parallax";
import AppHero from "./AppHero";

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [d, setD] = useState<ApplicationData>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [jobs, setJobs] = useState(2);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const set = (k: string, v: string) => {
    setD((p) => ({ ...p, [k]: v }));
    if (errors[k]) {
      setErrors((prev) => {
        const { [k]: _removed, ...rest } = prev;
        return rest;
      });
    }
  };
  const f: F = { d, set, errors };

  const focusFirstError = () => {
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const target = el.getAttribute("role") === "radiogroup" ? el.querySelector<HTMLElement>("[tabindex='0']") : el;
      target?.focus({ preventScroll: true });
    });
  };

  const goTo = (i: number) => {
    setErrors({});
    setSubmitError(null);
    setStep(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  };

  const submit = async () => {
    const invalid = validateAll(d);
    if (invalid) {
      setStep(invalid.step);
      setErrors(invalid.errors);
      focusFirstError();
      return;
    }

    setStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: d, website: honeypot.current?.value ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        step?: number;
        errors?: FieldErrors;
      };
      if (!res.ok) {
        if (typeof json.step === "number" && json.errors) {
          setStep(json.step);
          setErrors(json.errors);
          focusFirstError();
        }
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("We couldn't reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const stepErrors = validateStep(step, d);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      focusFirstError();
      return;
    }
    if (step === STEPS.length - 1) {
      void submit();
      return;
    }
    setMaxStep((m) => Math.max(m, step + 1));
    goTo(step + 1);
  };

  if (status === "done")
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
        <div className="section-card max-w-lg text-center" role="status">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl text-balance">Thank you, {d["firstNames"]}.</h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Your application for <strong className="text-foreground">{d["position"]}</strong> has been received.
            We&apos;ve sent a confirmation to <strong className="text-foreground">{d["email"]}</strong> and our
            Registered Manager will be in touch.
          </p>
        </div>
      </main>
    );

  const errorCount = Object.keys(errors).length;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    
    <main>
         <AppHero/>
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[340px_1fr]">
      <aside className="bg-sidebar px-8 py-10 text-sidebar-foreground lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sidebar-primary">Moreloved Care</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-balance">Join our care team</h1>
        <p className="mt-3 text-sm leading-relaxed opacity-80">
          Everything you share is kept in confidence. No applicant will be unfairly discriminated against.
        </p>
        <nav aria-label="Application steps" className="mt-10 hidden lg:block">
          <ol className="space-y-1">
            {STEPS.map((s, i) => {
              const reachable = i <= maxStep && i !== step;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => reachable && goTo(i)}
                    disabled={!reachable && i !== step}
                    aria-current={i === step ? "step" : undefined}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring ${
                      i === step
                        ? "bg-sidebar-accent"
                        : reachable
                          ? "cursor-pointer hover:bg-sidebar-accent/60"
                          : "cursor-not-allowed opacity-55"
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                        i <= maxStep
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "border border-sidebar-border"
                      }`}
                    >
                      {i < maxStep && i !== step ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{s.title}</span>
                      <span className="block text-xs opacity-70">{s.hint}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
        <p className="mt-10 hidden text-xs opacity-60 lg:block">
          Need large print or extra time? Contact the Registered Manager.
        </p>
      </aside>

      <main className="mx-auto w-full max-w-3xl px-5 py-10 md:px-10">
        <form noValidate onSubmit={onSubmit} aria-labelledby="step-heading">
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-xs font-medium text-muted-foreground">
              <span>
                Step {step + 1} of {STEPS.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-label="Application progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <h2
              id="step-heading"
              ref={headingRef}
              tabIndex={-1}
              className="mt-6 font-display text-3xl outline-none md:text-4xl"
            >
              {STEPS[step]?.title}
            </h2>
          </div>

          {(errorCount > 0 || submitError) && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
            >
              {submitError ??
                `Please fix ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} before continuing.`}
            </div>
          )}

          <div aria-hidden="true" className="absolute -left-2499.75 h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-6">
            {step === 0 && <StepRole {...f} />}
            {step === 1 && <StepPersonal {...f} />}
            {step === 2 && <StepEducation {...f} />}
            {step === 3 && (
              <StepEmployment {...f} jobs={jobs} addJob={() => setJobs((j) => Math.min(j + 1, MAX_EMPLOYERS))} />
            )}
            {step === 4 && <StepRefs {...f} />}
            {step === 5 && <StepDeclare {...f} />}
            {step === 6 && <StepFinal {...f} />}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, step - 1))}
              disabled={step === 0 || status === "submitting"}
              className="flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : step === STEPS.length - 1 ? (
                "Submit application"
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
    </main>
    

  );
}
