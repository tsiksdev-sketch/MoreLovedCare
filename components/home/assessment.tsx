"use client"

import { useState } from "react"
import { Loader2, Mail, MapPinned, Phone, Send, User } from "lucide-react"
import { services, contact } from "@/lib/site"
import {
  contactSchema,
  type ContactErrors,
  type ContactFormState,
} from "@/lib/contact-schema"
import { Field, inputCls, ServerError, SuccessPanel } from "./form-ui"

const initial: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  location: "",
  service: "",
  message: "",
}

export function AssessmentForm() {
  const [form, setForm] = useState<ContactFormState>(initial)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle")
  const [serverError, setServerError] = useState<string | null>(null)

  const update =
    (k: keyof ContactFormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [k]: e.target.value }))
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
      if (serverError) setServerError(null)
    }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "submitting") return

    setServerError(null)

    const parsed = contactSchema.safeParse(form)
    if (!parsed.success) {
      const errs: ContactErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormState
        if (!errs[key]) errs[key] = issue.message
      }
      setErrors(errs)
      return
    }

    setStatus("submitting")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string
          fieldErrors?: ContactErrors
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
        title="Thank you — we've received your request."
        onReset={() => setStatus("idle")}
        resetLabel="Send another request"
      >
        A member of our team will be in touch shortly to arrange your care
        assessment. If your request is urgent please call {contact.phone}.
      </SuccessPanel>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-5">
      {serverError ? <ServerError message={serverError} /> : null}

      <Field label="Full name" error={errors.name} icon={<User className="h-4 w-4" />}>
        <input
          value={form.name}
          onChange={update("name")}
          className={inputCls}
          placeholder="Jane Doe"
          autoComplete="name"
        />
      </Field>

      <Field label="Email address" error={errors.email} icon={<Mail className="h-4 w-4" />}>
        <input
          type="email"
          value={form.email}
          onChange={update("email")}
          className={inputCls}
          placeholder="jane@example.com"
          autoComplete="email"
        />
      </Field>

      <Field label="Phone number" error={errors.phone} icon={<Phone className="h-4 w-4" />}>
        <input
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          className={inputCls}
          placeholder="07000 000000"
          autoComplete="tel"
        />
      </Field>

      <Field
        label="Location / postcode"
        error={errors.location}
        icon={<MapPinned className="h-4 w-4" />}
      >
        <input
          value={form.location}
          onChange={update("location")}
          className={inputCls}
          placeholder="Biggleswade, SG18"
          autoComplete="postal-code"
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="I am enquiring about..." error={errors.service}>
          <select value={form.service} onChange={update("service")} className={inputCls}>
            <option value="">Please select a service</option>
            {services.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / General enquiry">Other / General enquiry</option>
          </select>
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Tell us what is happening" error={errors.message}>
          <textarea
            value={form.message}
            onChange={update("message")}
            rows={4}
            className={inputCls}
            placeholder="Who is the support for, and what is happening now?"
          />
        </Field>
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs text-muted-foreground max-w-xs">
          By submitting you agree to be contacted regarding your enquiry.
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
              Request assessment
              <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
