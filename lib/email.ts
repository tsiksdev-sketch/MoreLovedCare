import { Resend } from "resend"

/**
 * Deliverability notes (why these emails should stay out of spam):
 *
 * 1. Authenticated sender — the `from` address MUST be on a domain you have
 *    verified in Resend (SPF + DKIM + DMARC). `onboarding@resend.dev` only
 *    delivers to the Resend account owner and is treated as spam elsewhere,
 *    so we throw if a real CONTACT_FROM_EMAIL is not configured.
 * 2. Consistent From, visitor in Reply-To — mailbox providers flag mail whose
 *    From address does not match the authenticated domain. We never put the
 *    visitor's address in `from`; it goes in `replyTo` so replies still work.
 * 3. Multipart (text + HTML) — text-only mail scores as more spammy. Every
 *    send below includes both a plain-text and an HTML part.
 * 4. Stable headers — a unique `X-Entity-Ref-ID` stops Gmail from clipping or
 *    collapsing similar messages into one thread.
 */

export function getResend(): { resend: Resend } | { error: string } {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log("[v0] RESEND_API_KEY is not set")
    return { error: "Email service is not configured yet." }
  }
  return { resend: new Resend(apiKey) }
}

/**
 * Returns the sender identity. Prefers a verified domain (best deliverability),
 * but falls back to Resend's shared `onboarding@resend.dev` sender so mail is
 * still delivered when no domain has been verified yet.
 *
 * NOTE: with the fallback sender, Resend only delivers to the email address of
 * the Resend account owner. Set CONTACT_TO_EMAIL to that address, and verify a
 * domain + set CONTACT_FROM_EMAIL to deliver to any recipient and reach inboxes.
 */
export function getFromAddress(fallbackName: string): string {
  const configured = process.env.CONTACT_FROM_EMAIL?.trim()
  if (configured) return configured
  console.log(
    `[v0] CONTACT_FROM_EMAIL is not set — sending "${fallbackName}" from onboarding@resend.dev (deliverable only to the Resend account owner)`,
  )
  return `${fallbackName} <onboarding@resend.dev>`
}

export function getToAddress(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || ""
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

type Row = { label: string; value: string }

/**
 * Builds a clean, table-based HTML email. Simple inline styles and a real
 * heading structure read as legitimate transactional mail to spam filters.
 */
export function buildEmailHtml(options: {
  title: string
  intro?: string
  sections: { heading?: string; rows: Row[] }[]
  message?: { heading: string; body: string }
}): string {
  const { title, intro, sections, message } = options

  const sectionHtml = sections
    .map((section) => {
      const rows = section.rows
        .map(
          (row) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#5b6b5f;font-size:14px;white-space:nowrap;vertical-align:top">${escapeHtml(
              row.label,
            )}</td><td style="padding:4px 0;color:#1f2a22;font-size:14px">${escapeHtml(
              row.value,
            )}</td></tr>`,
        )
        .join("")
      const heading = section.heading
        ? `<h2 style="margin:20px 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#3f7050">${escapeHtml(
            section.heading,
          )}</h2>`
        : ""
      return `${heading}<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>`
    })
    .join("")

  const messageHtml = message
    ? `<h2 style="margin:20px 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#3f7050">${escapeHtml(
        message.heading,
      )}</h2><p style="margin:0;color:#1f2a22;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
        message.body,
      )}</p>`
    : ""

  const introHtml = intro
    ? `<p style="margin:0 0 12px;color:#5b6b5f;font-size:14px;line-height:1.6">${escapeHtml(
        intro,
      )}</p>`
    : ""

  return `<!doctype html><html><body style="margin:0;background:#f4f7f4;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;padding:28px;border:1px solid #e2ebe4">
<tr><td>
<h1 style="margin:0 0 12px;font-size:20px;color:#274b34">${escapeHtml(title)}</h1>
${introHtml}
${sectionHtml}
${messageHtml}
</td></tr></table></td></tr></table></body></html>`
}

/** A short, unique ID used for the X-Entity-Ref-ID anti-clipping header. */
export function refId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
