'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const contacts = [
  {
    name: "Laura",
    role: "Care Coordinator",
    number: "447769023608",
  },
  {
    name: "Louisa",
    role: "Care Coordinator",
    number: "447769023608",
  },
];

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.134 1.58 5.931L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.68 1.448h.004c6.554 0 11.89-5.335 11.893-11.89a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-2 w-72 rounded-2xl bg-card text-card-foreground shadow-2xl border border-border overflow-hidden"
          >
            <div className="bg-[#25D366] text-white p-4">
              <p className="font-serif text-xl">WhatsApp us</p>
              <p className="text-xs opacity-90">
                Message one of our care coordinators.
              </p>
            </div>
            <div className="p-3 space-y-1">
              {contacts.map((contact) => {
                const text = encodeURIComponent(
                  `Hi ${contact.name}, I'd like to enquire about MoreLoved Care services.`
                );
                const href = `https://wa.me/${contact.number}?text=${text}`;
                return (
                  <a
                    key={contact.name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-cream transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] flex-shrink-0">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {contact.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contact.role}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl transition-shadow"
        aria-label="Open WhatsApp contact options"
      >
        {open ? <X className="w-6 h-6" /> : <WhatsAppIcon className="w-7 h-7" />}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
      </motion.button>
    </div>
  );
}
