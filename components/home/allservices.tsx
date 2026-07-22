import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Heart,
  Brain,
  Users2,
  Accessibility,
  Sparkles,
  Baby,
  Home,
  Clock,
  HandHeart,
  Utensils,
  Pill,
  ShieldCheck,
  X,
} from "lucide-react";

const allServices = [
  {
    icon: Heart,
    title: "Personal care at home",
    text: "Respectful assistance with washing, dressing, oral care, toileting, continence care and grooming — always at the person's pace.",
  },
  {
    icon: Users2,
    title: "Support for older people",
    text: "Care that helps older people remain safe, involved and independent in familiar surroundings.",
  },
  {
    icon: Brain,
    title: "Dementia care & support",
    text: "Familiar routines, clear communication and reassurance for people living with dementia, planned with family involvement.",
  },
  {
    icon: Accessibility,
    title: "Physical disability support",
    text: "Assessed support with personal care, mobility, daily routines and participation in community life.",
  },
  {
    icon: Sparkles,
    title: "Mental health & wellbeing",
    text: "Practical, personal and emotional support at home within our homecare scope, alongside other professionals.",
  },
  {
    icon: Baby,
    title: "Children & young people",
    text: "Person-centred support planned with the young person, their family and involved professionals.",
  },
  {
    icon: Home,
    title: "Domestic & household support",
    text: "Light housework, laundry and keeping the home tidy and safe as part of an agreed care plan.",
  },
  {
    icon: Utensils,
    title: "Meal preparation & nutrition",
    text: "Support with planning, preparing and enjoying meals — respecting preferences, culture and dietary needs.",
  },
  {
    icon: Pill,
    title: "Medication support",
    text: "Prompting, assisting or administering medication in line with our medicines policy and the care plan.",
  },
  {
    icon: HandHeart,
    title: "Companionship & social support",
    text: "Warm, reliable company, conversation and support to stay connected with people and interests.",
  },
  {
    icon: Clock,
    title: "Short visits to longer calls",
    text: "From brief welfare and medication calls through to longer, planned visits — always as agreed and assessed.",
  },
  {
    icon: ShieldCheck,
    title: "Hospital-to-home & recovery support",
    text: "Assessed short-term support to help people settle safely back home after a hospital stay.",
  },
];

export function AllServicesModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[500px]
          max-w-none
          p-0
          overflow-hidden
          rounded-2xl
        "
      >
        {/* Header stays fixed; only body scrolls */}
        <div className="border-b border-border px-4 sm:px-6 py-5">
          <DialogHeader className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="eyebrow">All services</p>
                <DialogTitle className="text-2xl sm:text-3xl text-primary leading-tight font-serif">
                  Every way we can <em className="italic font-light">support you</em>.
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
                  MoreLoved Care is registered for the regulated activity of Personal care. Any service is agreed after an assessment and recorded in an individual care plan.
                </DialogDescription>
              </div>

              {/* Optional header close (top-right) */}
              <DialogClose asChild>
                <button
                  type="button"
                  className="
                    shrink-0
                    inline-flex items-center justify-center
                    rounded-full
                    w-10 h-10
                    border border-border
                    bg-background
                    hover:bg-foreground/5
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                  "
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-primary" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable content only */}
        <div className="max-h-[70vh] overflow-y-auto px-4 sm:px-6 py-5">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {allServices.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="flex gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-background min-h-[96px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-blush text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-foreground leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Close button at the end of the scroll */}
          <div className="mt-6">
            <DialogClose asChild>
              <button
                type="button"
                className="
                  w-full
                  inline-flex items-center justify-center gap-2
                  rounded-2xl
                  px-4 py-3
                  bg-primary text-primary-foreground
                  hover:bg-primary/90
                  transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                "
              >
                Close
              </button>
            </DialogClose>
          </div>

          <div className="mt-4 rounded-2xl bg-cream/60 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-medium">Not sure if we can help?</strong> Tell us who the support is for and what is happening now — we will listen and explain the next step, or signpost you to the right service.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}