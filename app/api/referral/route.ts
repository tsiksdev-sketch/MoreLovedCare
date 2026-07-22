import { NextResponse } from "next/server"
import { Resend } from "resend"
import { referralSchema } from "@/lib/contact-schema"

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  // Server-side validation with the same schema used on the client.
  const parsed = referralSchema.safeParse(body)

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return NextResponse.json(
      { error: "Please check the form and try again.", fieldErrors },
      { status: 422 },
    )
  }

  const {
    referrerName,
    referrerOrg,
    referrerEmail,
    referrerPhone,
    clientName,
    clientLocation,
    service,
    urgency,
    details,
  } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log("[v0] RESEND_API_KEY is not set")
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)
  const from = process.env.CONTACT_FROM_EMAIL ?? "Referrals <contact@africarbontraining.com>"
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@morelovedcare.co.uk"

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: referrerEmail,
      subject: `New referral from MoreLovedCare Website (${urgency.split(" —")[0]}): ${clientName} — ${service}`,
      text: [
        "PROFESSIONAL REFERRAL",
        "",
        "Referrer",
        `  Name: ${referrerName}`,
        `  Organisation: ${referrerOrg}`,
        `  Email: ${referrerEmail}`,
        `  Phone: ${referrerPhone}`,
        "",
        "Person being referred",
        `  Name: ${clientName}`,
        `  Location: ${clientLocation}`,
        `  Service: ${service}`,
        `  Urgency: ${urgency}`,
        "",
        "Details:",
        details,
      ].join("\n"),
    })

    if (error) {
      console.log("[v0] Resend send error:", error)
      return NextResponse.json(
        { error: "We couldn't send your referral. Please try again." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] Unexpected error sending referral:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
