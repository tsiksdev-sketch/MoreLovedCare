'use server'

import { NextResponse } from "next/server"
import { referralSchema } from "@/lib/contact-schema"
import {
  buildEmailHtml,
  getFromAddress,
  getResend,
  getToAddress,
  refId,
} from "@/lib/email"

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

  const client = getResend()
  if ("error" in client) {
    return NextResponse.json({ error: client.error }, { status: 500 })
  }

  const from = getFromAddress("Referrals")
  if (!from) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 },
    )
  }
  const to = getToAddress()

  const text = [
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
  ].join("\n")

  const html = buildEmailHtml({
    title: "New professional referral",
    intro: `${referrerName} from ${referrerOrg} referred ${clientName}.`,
    sections: [
      {
        heading: "Referrer",
        rows: [
          { label: "Name", value: referrerName },
          { label: "Organisation", value: referrerOrg },
          { label: "Email", value: referrerEmail },
          { label: "Phone", value: referrerPhone },
        ],
      },
      {
        heading: "Person being referred",
        rows: [
          { label: "Name", value: clientName },
          { label: "Location", value: clientLocation },
          { label: "Service", value: service },
          { label: "Urgency", value: urgency },
        ],
      },
    ],
    message: { heading: "Details", body: details },
  })

  try {
    const { error } = await client.resend.emails.send({
      from,
      to,
      replyTo: referrerEmail,
      subject: `New referral (${urgency.split(" —")[0]}): ${clientName} — ${service}`,
      text,
      html,
      headers: { "X-Entity-Ref-ID": refId("referral") },
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
