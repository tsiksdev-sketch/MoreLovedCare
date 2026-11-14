import { Resend } from "resend";
import { MAX_FIELD_LENGTH, validateAll, type ApplicationData } from "@/lib/application";
import { renderApplicationHtml, renderApplicationText, renderConfirmationHtml } from "@/lib/application-email";

const KEY_RE = /^[A-Za-z0-9_]{1,40}$/;
const MAX_KEYS = 500;
const MAX_BODY_BYTES = 200_000;

function sanitize(input: unknown): ApplicationData | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const entries = Object.entries(input as Record<string, unknown>);
  if (entries.length > MAX_KEYS) return null;
  const out: ApplicationData = {};
  for (const [k, v] of entries) {
    if (!KEY_RE.test(k) || typeof v !== "string") continue;
    const trimmed = v.trim().slice(0, MAX_FIELD_LENGTH);
    if (trimmed) out[k] = trimmed;
  }
  return out;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPLICATIONS_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "Moreloved Care <contact@phoerymanagement.com>";

  if (!apiKey || !to) {
    console.error("[apply] Missing RESEND_API_KEY or APPLICATIONS_TO_EMAIL");
    return Response.json({ error: "Applications are temporarily unavailable. Please try again later." }, { status: 500 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ error: "Your application is too large to submit." }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = parsed as { data?: unknown; website?: unknown };
  // Honeypot: real users never see or fill the "website" field.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const data = sanitize(body.data);
  if (!data) return Response.json({ error: "Invalid request." }, { status: 400 });

  const invalid = validateAll(data);
  if (invalid) {
    return Response.json(
      { error: "Some fields need attention.", step: invalid.step, errors: invalid.errors },
      { status: 422 },
    );
  }

  const resend = new Resend(apiKey);
  const applicant = `${data["firstNames"]} ${data["surname"]}`;

  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()).filter(Boolean),
    replyTo: data["email"],
    subject: `New application: ${applicant} — ${data["position"]}`,
    html: renderApplicationHtml(data),
    text: renderApplicationText(data),
  });

  if (error) {
    console.error("[apply] Resend error:", error.message);
    return Response.json({ error: "We couldn't send your application. Please try again." }, { status: 502 });
  }

  const confirmation = await resend.emails.send({
    from,
    to: data["email"]!,
    subject: "We've received your application",
    html: renderConfirmationHtml(data),
  });
  if (confirmation.error) console.error("[apply] Confirmation email failed:", confirmation.error.message);

  return Response.json({ ok: true });
}
