import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      fullName,
      email,
      phone,
      organisation,
      jobTitle,
      country,
      sector,
      stakeholderType,
      areaOfInterest,
      message,
      consent,
    } = body as Record<string, string | boolean>

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full name, email, and message are required" },
        { status: 400 },
      )
    }

    // Validate consent
    if (!consent) {
      return NextResponse.json(
        { error: "Consent to be contacted is required" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(String(email))) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const row = (label: string, value?: string) =>
      value
        ? `<p style="margin: 10px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`
        : ""

   const { data, error } = await resend.emails.send({
  from: "Contact Form <contact@africarbontraining.com>",
  to: ["contact@africarbontraining.com"],
  replyTo: String(email),
    subject: `New AICTS Enquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #65a30d; padding-bottom: 10px;">
            New AICTS Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${row("Full name", fullName as string)}
            ${row("Email", email as string)}
            ${row("Phone", phone as string)}
            ${row("Organisation", organisation as string)}
            ${row("Job title", jobTitle as string)}
            ${row("Country", country as string)}
            ${row("Sector", sector as string)}
            ${row("Stakeholder type", stakeholderType as string)}
            ${row("Area of interest", areaOfInterest as string)}
            ${row("Consent to be contacted", consent ? "Yes" : "No")}
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(String(message))}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            This message was sent from your website contact form.
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
