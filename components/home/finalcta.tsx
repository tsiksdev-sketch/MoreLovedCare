"use client";

import { useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "./reveal";
import { contact } from "@/lib/site";
import { Modal } from "./modal";
import { AssessmentForm } from "./assessment";
import { ReferralForm } from "./referal-form";

type ActiveModal = "assessment" | "referral" | null;

export function FinalCTA() {
  const [active, setActive] = useState<ActiveModal>(null);
  const telHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

  return (
    <section id="assessment" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-blush via-cream to-blush" />

      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Let's talk</p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-7xl text-primary leading-[1.02]">
              Let us start with <em className="italic font-light">what matters to you</em>.
            </h2>
            <p className="mt-6 text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
              You do not need to know every care term or have every document ready before making
              contact. Tell us who the support is for and what is happening now we will listen
              and explain the next step.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => setActive("assessment")}
              className="group text-left rounded-2xl bg-primary text-primary-foreground p-6 flex flex-col justify-between min-h-45 hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <span className="text-sm opacity-80">Primary</span>
              <div>
                <p className="text-xl font-serif">Request a care assessment</p>
                <ArrowRight className="w-5 h-5 mt-3 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActive("referral")}
              className="group text-left rounded-2xl bg-card border border-border p-6 flex flex-col justify-between min-h-45 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <span className="eyebrow">Professionals</span>
              <div>
                <p className="text-xl font-serif text-foreground">Make a professional referral</p>
                <ArrowRight className="w-5 h-5 mt-3 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            <a
              href={telHref}
              className="group rounded-2xl bg-gold text-gold-foreground p-6 flex flex-col justify-between min-h-45 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <span className="text-sm opacity-80">Call us</span>
              <div>
                <p className="text-xl font-serif">{contact.phone}</p>
                <Phone className="w-5 h-5 mt-3" />
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-xs text-muted-foreground max-w-xl mx-auto">
            Submitting an enquiry or referral does not confirm that MoreLoved Care can accept or
            begin a service. Assessment, current capacity, service scope and safe delivery must
            be considered first.
          </p>
        </Reveal>
      </div>

      <Modal
        open={active === "assessment"}
        onClose={() => setActive(null)}
        title="Request a care assessment"
        description="Tell us who the support is for and what is happening now."
      >
        <AssessmentForm />
      </Modal>

      <Modal
        open={active === "referral"}
        onClose={() => setActive(null)}
        title="Make a professional referral"
        description="For GPs, social workers, discharge teams and other professionals."
      >
        <ReferralForm />
      </Modal>
    </section>
  );
}