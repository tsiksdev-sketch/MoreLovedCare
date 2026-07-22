'use server'

import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact-schema"
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
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    )
  }

  // Server-side validation with the same schema used on the client.
  const parsed = contactSchema.safeParse(body)

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

  const { name, email, phone, location, service, message } = parsed.data

  const client = getResend()
  if ("error" in client) {
    return NextResponse.json({ error: client.error }, { status: 500 })
  }

  const from = getFromAddress("Enquiries")
  if (!from) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 },
    )
  }
  const to = getToAddress()

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Location: ${location}`,
    `Service: ${service}`,
    "",
    "Message:",
    message,
  ].join("\n")

  const html = buildEmailHtml({
    title: "New enquiry From MoreLovedCare Website",
    intro: `${name} got in touch about "${service}".`,
    sections: [
      {
        heading: "Contact",
        rows: [
          { label: "Name", value: name },
          { label: "Email", value: email },
          { label: "Phone", value: phone },
          { label: "Location", value: location },
          { label: "Service", value: service },
        ],
      },
    ],
    message: { heading: "Message", body: message },
  })

  try {
    const { error } = await client.resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry: ${service} — ${name}`,
      text,
      html,
      headers: { "X-Entity-Ref-ID": refId("enquiry") },
    })

    if (error) {
      console.log("[v0] Resend send error:", error)
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] Unexpected error sending email:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
