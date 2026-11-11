import type { Metadata } from "next";
import ApplicationForm from "@/components/application";

export const metadata: Metadata = {
  title: "Job Application Form — Betna Agencies Ltd",
  description:
    "Apply online to join Betna Agencies Ltd. Share your availability, experience, references and declarations in a few guided steps.",
  openGraph: {
    title: "Job Application Form — Betna Agencies Ltd",
    description: "A guided online application to join the Betna Agencies care team.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function JobApplicationPage() {
  return <ApplicationForm />;
}