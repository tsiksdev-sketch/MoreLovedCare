
import { pageContents } from "@/constants/pages";
import type { Metadata } from "next";
import { FormPage } from "@/components/formPage";

const page = pageContents["about"];

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
  return <FormPage page={page} kind="contact" />;
}