"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Client island: the accordion open/close state is the only client behaviour.
export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
        type="button"
      >
        <span className="text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
          {q}
        </span>

        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 mt-1.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-muted-foreground leading-relaxed max-w-3xl">{a}</p>
      </motion.div>
    </div>
  );
}
