
export type FormKind = "contact" | "assessment" | "existing" | "safeguarding" | "referral"

export type FieldDef = {
  label: string
  name: string
  type?: string
  required?: boolean
  textarea?: boolean
  placeholder?: string
}

export const FORM_KINDS: FormKind[] = ["contact", "assessment", "existing", "safeguarding", "referral"]

export const formTitles: Record<FormKind, string> = {
  contact: "Care enquiry",
  assessment: "Assessment request",
  existing: "Existing client update",
  safeguarding: "Safeguarding concern",
  referral: "Professional referral",
}

export const fieldSets: Record<FormKind, FieldDef[]> = {
  contact: [
    { label: "Your name", name: "name", required: true },
    { label: "Contact number", name: "phone", type: "tel" },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Postcode of person needing care", name: "postcode" },
    {
      label: "How can we help?",
      name: "message",
      textarea: true,
      required: true,
      placeholder: "A short description of the situation and how urgent it feels.",
    },
  ],
  assessment: [
    { label: "Your name", name: "name", required: true },
    { label: "Relationship to the person", name: "relationship", placeholder: "Self / relative / professional" },
    { label: "Phone", name: "phone", type: "tel", required: true },
    { label: "Email", name: "email", type: "email" },
    { label: "Postcode", name: "postcode", required: true },
    { label: "Awareness — is the person aware of this enquiry?", name: "awareness" },
    {
      label: "Funding route",
      name: "funding",
      placeholder: "Self-funded / Local authority / NHS CHC / Direct payment / Unsure",
    },
    { label: "Describe the current situation and support needed", name: "situation", textarea: true, required: true },
  ],
  existing: [
    { label: "Your name", name: "name", required: true },
    { label: "Person receiving care", name: "person" },
    { label: "Phone", name: "phone", type: "tel", required: true },
    { label: "What has changed or what do you need?", name: "message", textarea: true, required: true },
  ],
  safeguarding: [
    { label: "Your name", name: "name" },
    { label: "Contact number", name: "phone", type: "tel" },
    { label: "Person the concern relates to", name: "person" },
    { label: "Location or postcode", name: "location" },
    {
      label: "Nature of the concern",
      name: "concern",
      textarea: true,
      required: true,
      placeholder: "What has happened, when, who was involved, is there immediate risk?",
    },
  ],
  referral: [
    { label: "Referrer full name", name: "name", required: true },
    { label: "Role / job title", name: "role", required: true },
    { label: "Organisation", name: "org", required: true },
    { label: "Work email", name: "email", type: "email", required: true },
    { label: "Work phone", name: "phone", type: "tel", required: true },
    { label: "Person being referred", name: "person" },
    { label: "Postcode", name: "postcode", required: true },
    { label: "Funding route", name: "funding", placeholder: "LA / NHS CHC / S117 / Direct payment / Self-funded" },
    { label: "Presenting need and urgency", name: "need", textarea: true, required: true },
  ],
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Loose international phone check: digits, spaces, and + ( ) - allowed, 7-15 digits.
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

export function isValidFormKind(value: unknown): value is FormKind {
  return typeof value === "string" && (FORM_KINDS as string[]).includes(value)
}

export type FormValues = Record<string, string>

// Returns a map of fieldName -> error message. Empty object means valid.
export function validateForm(kind: FormKind, values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  const fields = fieldSets[kind]

  for (const field of fields) {
    const raw = values[field.name]
    const value = typeof raw === "string" ? raw.trim() : ""

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`
      continue
    }

    if (!value) continue // optional + empty is fine

    if (field.type === "email" && !EMAIL_RE.test(value)) {
      errors[field.name] = "Please enter a valid email address."
    }

    if (field.type === "tel" && !PHONE_RE.test(value)) {
      errors[field.name] = "Please enter a valid phone number."
    }
  }

  return errors
}
