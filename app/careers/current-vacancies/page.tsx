import { ContentPage } from "@/components/contentPage";
import { pageContents } from "@/constants/pages";
import type { Metadata } from "next";
import { LeafPage } from "@/components/leafPage";

const page = pageContents["careers__current-vacancies"];

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
  return <LeafPage page={page} />;
}