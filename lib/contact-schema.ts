import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter a valid phone").max(30),
  location: z
    .string()
    .trim()
    .min(2, "Please enter your location or postcode")
    .max(120),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Please share a little more").max(1500),
})

export type ContactFormState = z.infer<typeof contactSchema>
export type ContactErrors = Partial<Record<keyof ContactFormState, string>>

export const URGENCY_OPTIONS = [
  "Routine — planning ahead",
  "Soon — within a few weeks",
  "Urgent — support needed quickly",
] as const

export const referralSchema = z.object({
  referrerName: z.string().trim().min(2, "Please enter your name").max(100),
  referrerOrg: z
    .string()
    .trim()
    .min(2, "Please enter your organisation")
    .max(150),
  referrerEmail: z.string().trim().email("Please enter a valid email").max(255),
  referrerPhone: z.string().trim().min(6, "Please enter a valid phone").max(30),
  clientName: z
    .string()
    .trim()
    .min(2, "Please enter the person's name")
    .max(100),
  clientLocation: z
    .string()
    .trim()
    .min(2, "Please enter their location or postcode")
    .max(120),
  service: z.string().min(1, "Please choose a service"),
  urgency: z.enum(URGENCY_OPTIONS, {
    error: "Please select how urgent this is",
  }),
  details: z
    .string()
    .trim()
    .min(10, "Please share a little more about the referral")
    .max(2000),
  consent: z.literal(true, {
    error: "Please confirm you have consent to share these details",
  }),
})

export type ReferralFormState = z.infer<typeof referralSchema>
export type ReferralErrors = Partial<Record<keyof ReferralFormState, string>>
