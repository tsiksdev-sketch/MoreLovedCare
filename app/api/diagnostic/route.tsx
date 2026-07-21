import { Resend } from "resend"
import { NextResponse } from "next/server"


function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const {
      name,
      email,
      org,
      country,
      sector,
      stakeholder,
      support,
      description,
      hasDocs,
      contact,
    } = body as Record<string, string>

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and a short description are required" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const row = (label: string, value?: string) =>
      value
        ? `<p style="margin: 10px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`
        : ""

    const { data, error } = await resend.emails.send({
      from: "AICTS Diagnostic <contact@africarbontraining.com>",
      to: ["contact@africarbontraining.com"],
      replyTo: email,
      subject: `New AICTS Diagnostic Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #65a30d; padding-bottom: 10px;">
            New AICTS Diagnostic Request
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${row("Full name", name)}
            ${row("Email", email)}
            ${row("Organisation", org)}
            ${row("Country", country)}
            ${row("Sector", sector)}
            ${row("Stakeholder type", stakeholder)}
            ${row("Support requested", support)}
            ${row("Existing data / documentation", hasDocs)}
            ${row("Preferred contact method", contact)}
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Project / objective description:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(description)}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            This diagnostic request was submitted from the AICTS website.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
