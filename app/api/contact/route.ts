import { NextResponse } from "next/server"
import { Resend } from "resend"
import { fieldSets, formTitles, isValidFormKind, validateForm, type FormValues } from "@/lib/forms"

// Single route that handles every form type. The `kind` field in the body
// selects which field set to validate against and how to compose the email.

// Where submissions are delivered. Set CONTACT_TO_EMAIL in the project env.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "delivered@resend.dev"
// Must be a verified domain in Resend. onboarding@resend.dev works for testing.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "More Loved Care <onboarding@resend.dev>"

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { kind, ...rawValues } = (body ?? {}) as { kind?: unknown } & Record<string, unknown>

  if (!isValidFormKind(kind)) {
    return NextResponse.json({ error: "Invalid or missing form type." }, { status: 400 })
  }

  // Coerce all incoming values to strings so validation is consistent.
  const values: FormValues = {}
  for (const [key, val] of Object.entries(rawValues)) {
    values[key] = val == null ? "" : String(val)
  }

  // Server-side validation using the shared field definitions.
  const fieldErrors = validateForm(kind, values)
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured yet. Please set RESEND_API_KEY." },
      { status: 500 },
    )
  }
  const resend = new Resend(apiKey)

  // Build a readable email from the submitted fields, in field order.
  const rows = fieldSets[kind]
    .map((field) => {
      const value = (values[field.name] ?? "").trim()
      if (!value) return ""
      return `<tr>
        <td style="padding:6px 12px;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(field.label)}</td>
        <td style="padding:6px 12px;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`
    })
    .filter(Boolean)
    .join("")

  const title = formTitles[kind]
  const urgentNote =
    kind === "safeguarding"
      ? `<p style="color:#b00;font-weight:600;margin:0 0 16px;">Safeguarding concern — please review urgently.</p>`
      : ""

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
      <h2 style="margin:0 0 4px;">New ${escapeHtml(title)}</h2>
      <p style="color:#666;margin:0 0 16px;">Form type: ${escapeHtml(kind)}</p>
      ${urgentNote}
      <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">${rows}</table>
    </div>`

  const replyTo = typeof values.email === "string" && values.email ? values.email : undefined

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to:  [TO_EMAIL, "admin@morelovedcare.co.uk"],
      subject: `Moreloved Care Website [${kind}] ${title}${values.name ? ` — ${values.name}` : ""}`,
      replyTo,
      html,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      return NextResponse.json({ error: "We couldn't send your message. Please try again." }, { status: 502 })
    }

    return NextResponse.json({ success: true, message: "Your message has been sent." })
  } catch (err) {
    console.log("[v0] Unexpected send error:", err)
    return NextResponse.json({ error: "We couldn't send your message. Please try again." }, { status: 502 })
  }
}
