
import { pageContents } from "@/constants/pages";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legalPage";

const page = pageContents["recruitment-privacy-notice"];

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: {
    canonical: page.url,
  },
  openGraph: {
    title: page.seoTitle,
    description: page.metaDescription,
    type: "article",
  },
};

export default function Page() {
  return <LegalPage page={page} />;
}