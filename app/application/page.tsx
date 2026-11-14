import type { Metadata } from "next";
import ApplicationForm from "@/components/application/application-form";

export const metadata: Metadata = {
  title: "Job Application Form — Moreloved Care",
  description:
    "Apply online to join Moreloved Care. Share your availability, experience, references and declarations in a few guided steps.",
  openGraph: {
    title: "Job Application Form — Moreloved Care",
    description: "A guided online application to join the Moreloved Care team.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function JobApplicationPage() {
  return <ApplicationForm />;
}