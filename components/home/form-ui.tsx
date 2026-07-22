import { AlertCircle, Check } from "lucide-react"

export const inputCls =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition"

export function Field({
  label,
  error,
  children,
  icon,
}: {
  label: string
  error?: string
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary/80 font-semibold">
        {icon}
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error ? (
        <span className="mt-1.5 block text-xs text-destructive font-medium">
          {error}
        </span>
      ) : null}
    </label>
  )
}

export function ServerError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="sm:col-span-2 flex items-center gap-2.5 rounded-xl bg-destructive/10 ring-1 ring-destructive/30 px-4 py-3 text-sm text-destructive font-medium"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      {message}
    </div>
  )
}

export function SuccessPanel({
  title,
  children,
  onReset,
  resetLabel = "Send another",
}: {
  title: string
  children: React.ReactNode
  onReset: () => void
  resetLabel?: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl bg-secondary/15 ring-1 ring-secondary/40 p-6 flex gap-4 items-start"
    >
      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center shrink-0">
        <Check className="h-5 w-5" strokeWidth={3} />
      </div>
      <div>
        <div className="font-display text-xl text-primary">{title}</div>
        <div className="mt-1 text-sm text-foreground/70">{children}</div>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {resetLabel}
        </button>
      </div>
    </div>
  )
}
