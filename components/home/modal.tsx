"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2)}`)

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    // Move focus into the panel for accessibility.
    const raf = requestAnimationFrame(() => {
      panelRef.current?.focus()
    })

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(raf)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId.current}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 -z-10 h-full w-full cursor-default bg-foreground/40 backdrop-blur-sm animate-in fade-in"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative my-4 w-full max-w-2xl rounded-[2rem] bg-card ring-1 ring-border shadow-(--shadow-soft) outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
          <div>
            <h2
              id={titleId.current}
              className="font-display text-2xl md:text-3xl text-primary leading-tight text-balance"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 sm:px-8">{children}</div>
      </div>
    </div>
  )
}
