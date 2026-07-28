
import { pageContents } from "@/constants/pages";
import type { Metadata } from "next";
import { FormPage } from "@/components/formPage";

const page = pageContents["for-professi onals__make-a-referral"];

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
  return <FormPage page={page} kind='referral' />;
}