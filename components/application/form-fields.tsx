"use client";

import type { HTMLInputTypeAttribute, ReactNode } from "react";
import { MAX_FIELD_LENGTH, type ApplicationData, type FieldErrors } from "@/lib/application";

export type F = {
  d: ApplicationData;
  set: (k: string, v: string) => void;
  errors: FieldErrors;
};

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <span id={id} className="mt-1.5 block text-xs font-medium text-destructive">
      {msg}
    </span>
  );
}

export function Field({
  f,
  k,
  label,
  type = "text",
  area,
  span,
  placeholder,
  autoComplete,
  inputMode,
}: {
  f: F;
  k: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  area?: boolean;
  span?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}) {
  const err = f.errors[k];
  const id = `field-${k}`;
  const errId = `${id}-error`;
  const common = {
    id,
    name: k,
    className: "field-input",
    value: f.d[k] ?? "",
    placeholder,
    autoComplete,
    "aria-invalid": err ? true : undefined,
    "aria-describedby": err ? errId : undefined,
  };

  return (
    <div className={span ? "md:col-span-2" : undefined}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {area ? (
        <textarea rows={4} maxLength={MAX_FIELD_LENGTH} {...common} onChange={(e) => f.set(k, e.target.value)} />
      ) : (
        <input
          type={type}
          maxLength={255}
          inputMode={inputMode}
          {...common}
          onChange={(e) => f.set(k, e.target.value)}
        />
      )}
      <ErrorText id={errId} msg={err} />
    </div>
  );
}

export function Choice({
  f,
  k,
  label,
  options = ["Yes", "No"],
}: {
  f: F;
  k: string;
  label: string;
  options?: string[];
}) {
  const err = f.errors[k];
  const labelId = `choice-${k}-label`;
  const errId = `choice-${k}-error`;
  const selected = f.d[k];

  return (
    <div
      className={`flex flex-col gap-3 rounded-lg md:flex-row md:items-center md:justify-between ${
        err ? "bg-destructive/5 p-3" : ""
      }`}
    >
      <div>
        <span id={labelId} className={`text-sm ${err ? "text-destructive" : "text-foreground"}`}>
          {label}
        </span>
        <ErrorText id={errId} msg={err} />
      </div>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={err ? errId : undefined}
        aria-invalid={err ? true : undefined}
        className="flex shrink-0 flex-wrap gap-2"
      >
        {options.map((o, i) => {
          const on = selected === o;
          const focusable = on || (!selected && i === 0);
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={focusable ? 0 : -1}
              className="chip"
              data-on={on}
              onClick={() => f.set(k, o)}
              onKeyDown={(e) => {
                if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
                e.preventDefault();
                const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
                const nextIdx = (i + dir + options.length) % options.length;
                f.set(k, options[nextIdx]!);
                const group = e.currentTarget.parentElement;
                (group?.children[nextIdx] as HTMLElement | undefined)?.focus();
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Checkbox({ f, k, children }: { f: F; k: string; children: ReactNode }) {
  const err = f.errors[k];
  const id = `field-${k}`;
  const errId = `${id}-error`;
  return (
    <div className="mt-5">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 text-sm ${err ? "text-destructive" : ""}`}
      >
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
          checked={f.d[k] === "1"}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? errId : undefined}
          onChange={(e) => f.set(k, e.target.checked ? "1" : "")}
        />
        <span>{children}</span>
      </label>
      <ErrorText id={errId} msg={err} />
    </div>
  );
}

export function Card({ title, sub, children }: { title?: string; sub?: string; children: ReactNode }) {
  return (
    <section className="section-card">
      {title && <h3 className="font-display text-xl">{title}</h3>}
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      <div className={title ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

export function Repeat({
  f,
  prefix,
  n,
  cols,
}: {
  f: F;
  prefix: string;
  n: number;
  cols: [key: string, label: string, type?: string][];
}) {
  return (
    <div className="space-y-5">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="grid gap-4 border-b border-border pb-5 last:border-0 last:pb-0 md:grid-cols-2">
          {cols.map(([k, l, t]) => (
            <Field key={k} f={f} k={`${prefix}${i}_${k}`} label={l} type={t} />
          ))}
        </div>
      ))}
    </div>
  );
}
