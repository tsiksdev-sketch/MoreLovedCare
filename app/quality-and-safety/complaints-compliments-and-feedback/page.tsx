import { ContentPage } from "@/components/contentPage";
import { pageContents } from "@/constants/pages";
import type { Metadata } from "next";

const page = pageContents["quality-and-safety__complaints-compliments-and-feedback"];

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