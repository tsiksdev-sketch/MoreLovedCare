import { ContentPage } from "@/components/contentPage";
import { pageContents } from "@/constants/pages";
import type { Metadata } from "next";

const page = pageContents["how-care-begins__assessment-and-care-planning"];

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
  return <ContentPage page={page} />;
}