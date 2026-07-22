import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { ReactNode } from "react";
type LegalKind = "terms" | "privacy";
export function LegalModal({
  open,
  onOpenChange,
  kind,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  kind: LegalKind;
}) {
  const content = kind === "terms" ? terms : privacy;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <p className="eyebrow">{kind === "terms" ? "Legal" : "Your data"}</p>
          <DialogTitle className="text-3xl md:text-4xl text-primary leading-tight font-serif">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Last updated: January 2026 · MoreLoved Care Ltd (Company no. 12932401)
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6 text-sm text-foreground/85 leading-relaxed">
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h3 className="text-base font-medium text-primary mb-2">{s.heading}</h3>
              <div className="space-y-2">{s.body}</div>
            </section>
          ))}
          <section className="rounded-2xl bg-cream/60 p-5">
            <h3 className="text-base font-medium text-primary mb-2">Contact us</h3>
            <p>
              MoreLoved Care Ltd, Sovereign House, 184 Nottingham Road, Nottingham, NG7 7BA<br />
              <a href="tel:01156812514" className="text-primary underline underline-offset-4">0115 681 2514</a> ·{" "}
              <a href="mailto:hello@morelovedcare.co.uk" className="text-primary underline underline-offset-4">hello@morelovedcare.co.uk</a>
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
type Section = { heading: string; body: ReactNode };
const terms: { title: ReactNode; sections: Section[] } = {
  title: <>Terms of <em className="italic font-light">use</em></>,
  sections: [
    {
      heading: "1. About this website",
      body: (
        <p>
          This website is operated by MoreLoved Care Ltd, a company registered in England and
          Wales (company number 12932401). It provides information about our regulated home care
          services in Nottingham and agreed areas of Nottinghamshire.
        </p>
      ),
    },
    {
      heading: "2. Information, not clinical advice",
      body: (
        <p>
          Content on this site is for general information and does not replace clinical advice,
          an assessment or a care plan. Any care we provide is agreed following an assessment and
          recorded in an individual care plan.
        </p>
      ),
    },
    {
      heading: "3. Regulated activity",
      body: (
        <p>
          MoreLoved Care is registered with the Care Quality Commission for the regulated
          activity of Personal care. We do not provide nursing care, and we only operate in areas
          agreed with the local authority.
        </p>
      ),
    },
    {
      heading: "4. Acceptable use",
      body: (
        <p>
          You agree to use this website lawfully and not to attempt to disrupt it, misuse the
          contact forms, or submit personal data about another person without their consent.
        </p>
      ),
    },
    {
      heading: "5. Intellectual property",
      body: (
        <p>
          All content, branding and imagery on this site belong to MoreLoved Care Ltd or its
          licensors. You may view and share pages for personal, non-commercial use only.
        </p>
      ),
    },
    {
      heading: "6. Liability",
      body: (
        <p>
          We take reasonable care to keep information accurate, but the site is provided "as is".
          Nothing in these terms limits our liability where it cannot lawfully be limited.
        </p>
      ),
    },
    {
      heading: "7. Governing law",
      body: (
        <p>These terms are governed by the laws of England and Wales.</p>
      ),
    },
  ],
};
const privacy: { title: ReactNode; sections: Section[] } = {
  title: <>Privacy <em className="italic font-light">notice</em></>,
  sections: [
    {
      heading: "Who we are",
      body: (
        <p>
          MoreLoved Care Ltd is the data controller for information collected through this site
          and for the care we provide. We are registered with the Information Commissioner's
          Office.
        </p>
      ),
    },
    {
      heading: "What we collect",
      body: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Contact details you give us (name, phone, email, postcode).</li>
          <li>Information about the person needing support, provided with appropriate consent.</li>
          <li>Records created during assessment and care delivery, held securely.</li>
          <li>Basic technical data (device, pages viewed) to keep the site working.</li>
        </ul>
      ),
    },
    {
      heading: "Why we use it",
      body: (
        <p>
          To respond to enquiries, arrange assessments, deliver assessed care safely, meet our
          regulatory duties (CQC, safeguarding, employment), and improve our service.
        </p>
      ),
    },
    {
      heading: "Lawful bases",
      body: (
        <p>
          We rely on legitimate interests, contract, legal obligation, and — for health
          information — the special category conditions for health and social care.
        </p>
      ),
    },
    {
      heading: "Who we share with",
      body: (
        <p>
          Only where necessary: healthcare and social care partners involved in a person's care,
          regulators (such as the CQC), safeguarding authorities, and trusted service providers
          who help us run our systems under written agreements.
        </p>
      ),
    },
    {
      heading: "How long we keep it",
      body: (
        <p>
          Care records are retained in line with statutory guidance. Enquiry data is kept only
          as long as needed to respond and evidence how we did so.
        </p>
      ),
    },
    {
      heading: "Your rights",
      body: (
        <p>
          You can request access to your data, ask us to correct or delete it, object to
          processing, or complain to the ICO. Contact us using the details below to exercise
          these rights.
        </p>
      ),
    },
    {
      heading: "Cookies",
      body: (
        <p>
          We use a small number of essential cookies to keep the site working. We do not sell
          your data or use it for advertising profiling.
        </p>
      ),
    },
  ],
};
