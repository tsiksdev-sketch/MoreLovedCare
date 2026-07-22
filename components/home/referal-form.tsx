"use client"

import { useState } from "react"
import {
  Building2,
  Loader2,
  Mail,
  MapPinned,
  Phone,
  Send,
  User,
  UserRound,
} from "lucide-react"
import { services, contact } from "@/lib/site"
import {
  referralSchema,
  URGENCY_OPTIONS,
  type ReferralErrors,
  type ReferralFormState,
} from "@/lib/contact-schema"
import { Field, inputCls, ServerError, SuccessPanel } from "./form-ui"


const initial = {
  referrerName: "",
  referrerOrg: "",
  referrerEmail: "",
  referrerPhone: "",
  clientName: "",
  clientLocation: "",
  service: "",
  urgency: "",
  details: "",
  consent: false,
}

type DraftState = typeof initial

export function ReferralForm() {
  const [form, setForm] = useState<DraftState>(initial)
  const [errors, setErrors] = useState<ReferralErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle")
  const [serverError, setServerError] = useState<string | null>(null)

  const clearError = (k: keyof ReferralFormState) => {
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
    if (serverError) setServerError(null)
  }

  const update =
    (k: keyof ReferralFormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [k]: e.target.value }))
      clearError(k)
    }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "submitting") return

    setServerError(null)

    const parsed = referralSchema.safeParse(form)
    if (!parsed.success) {
      const errs: ReferralErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ReferralFormState
        if (!errs[key]) errs[key] = issue.message
      }
      setErrors(errs)
      return
    }

    setStatus("submitting")

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string
          fieldErrors?: ReferralErrors
        } | null

        if (data?.fieldErrors) setErrors(data.fieldErrors)
        setServerError(data?.error ?? "Something went wrong. Please try again.")
        setStatus("idle")
        return
      }

      setStatus("sent")
      setForm(initial)
      setErrors({})
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setStatus("idle")
    }
  }

  if (status === "sent") {
    return (
      <SuccessPanel
        title="Thank you — your referral has been received."
        onReset={() => setStatus("idle")}
        resetLabel="Submit another referral"
      >
        Our team will review the referral and be in touch to discuss next steps.
        For anything urgent please call {contact.phone}.
      </SuccessPanel>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-5">
      {serverError ? <ServerError message={serverError} /> : null}

      <p className="sm:col-span-2 text-xs uppercase tracking-widest text-secondary-foreground font-semibold">
        About you
      </p>

      <Field label="Your name" error={errors.referrerName} icon={<User className="h-4 w-4" />}>
        <input
          value={form.referrerName}
          onChange={update("referrerName")}
          className={inputCls}
          placeholder="Alex Smith"
          autoComplete="name"
        />
      </Field>

      <Field
        label="Organisation"
        error={errors.referrerOrg}
        icon={<Building2 className="h-4 w-4" />}
      >
        <input
          value={form.referrerOrg}
          onChange={update("referrerOrg")}
          className={inputCls}
          placeholder="NHS Trust, GP surgery, social work team..."
          autoComplete="organization"
        />
      </Field>

      <Field
        label="Work email"
        error={errors.referrerEmail}
        icon={<Mail className="h-4 w-4" />}
      >
        <input
          type="email"
          value={form.referrerEmail}
          onChange={update("referrerEmail")}
          className={inputCls}
          placeholder="alex@organisation.nhs.uk"
          autoComplete="email"
        />
      </Field>

      <Field
        label="Contact phone"
        error={errors.referrerPhone}
        icon={<Phone className="h-4 w-4" />}
      >
        <input
          type="tel"
          value={form.referrerPhone}
          onChange={update("referrerPhone")}
          className={inputCls}
          placeholder="0115 000 0000"
          autoComplete="tel"
        />
      </Field>

      <p className="sm:col-span-2 mt-2 text-xs uppercase tracking-widest text-secondary-foreground font-semibold">
        About the person being referred
      </p>

      <Field
        label="Their name"
        error={errors.clientName}
        icon={<UserRound className="h-4 w-4" />}
      >
        <input
          value={form.clientName}
          onChange={update("clientName")}
          className={inputCls}
          placeholder="Person receiving care"
        />
      </Field>

      <Field
        label="Their location / postcode"
        error={errors.clientLocation}
        icon={<MapPinned className="h-4 w-4" />}
      >
        <input
          value={form.clientLocation}
          onChange={update("clientLocation")}
          className={inputCls}
          placeholder="Biggleswade, SG18"
          autoComplete="postal-code"
        />
      </Field>

      <Field label="Service needed" error={errors.service}>
        <select value={form.service} onChange={update("service")} className={inputCls}>
          <option value="">Please select a service</option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other / To be assessed">Other / To be assessed</option>
        </select>
      </Field>

      <Field label="Urgency" error={errors.urgency}>
        <select value={form.urgency} onChange={update("urgency")} className={inputCls}>
          <option value="">Please select</option>
          {URGENCY_OPTIONS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </Field>

      <div className="sm:col-span-2">
        <Field label="Referral details" error={errors.details}>
          <textarea
            value={form.details}
            onChange={update("details")}
            rows={4}
            className={inputCls}
            placeholder="Reason for referral, current situation, and any relevant needs or risks."
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => {
              setForm((f) => ({ ...f, consent: e.target.checked }))
              clearError("consent")
            }}
            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-secondary/50"
          />
          <span className="text-sm text-foreground/80">
            I confirm I have the person&apos;s consent (or appropriate authority)
            to share these details with MoreLoved Care.
          </span>
        </label>
        {errors.consent ? (
          <span className="mt-1.5 block text-xs text-destructive font-medium">
            {errors.consent}
          </span>
        ) : null}
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs text-muted-foreground max-w-xs">
          A referral does not confirm we can accept or begin a service.
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium shadow-(--shadow-soft) hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              Sending
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Submit referral
              <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
