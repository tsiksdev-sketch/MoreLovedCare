"use client";

import { Fragment, useState, type ReactNode } from "react";

type Data = Partial<Record<string, string>>;

const STEPS = [
  { title: "The role", hint: "Position & availability" },
  { title: "About you", hint: "Personal details" },
  { title: "Education", hint: "Qualifications & training" },
  { title: "Employment", hint: "Work history" },
  { title: "Next of kin & references", hint: "Who we can contact" },
  { title: "Declarations", hint: "Safeguarding & privacy" },
  { title: "Statement & bank", hint: "Final details" },
];

const REQUIRED: Record<number, string[]> = {
  0: ["position", "workPref"],
  1: ["firstNames", "surname", "address", "postcode", "mobile", "email"],
  3: ["emp0_employer", "emp0_role"],
  4: ["kinName", "kinTel", "ref1_name", "ref1_tel", "ref2_name", "ref2_tel"],
  5: ["unspentConv", "unspentCaution", "prevConv", "declName", "declAgree"],
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["AM", "PM", "Eve"];

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [jobs, setJobs] = useState(2);
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setD((p) => ({ ...p, [k]: v }));
  const f = { d, set, errors };

  const next = () => {
    const missing = (REQUIRED[step] ?? []).filter((k) => !d[k]?.trim());
    if (k_email(d) && step === 1) missing.push("email");
    setErrors(missing);
    if (missing.length) return;
    if (step === STEPS.length - 1) setDone(true);
    else setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done)
    return (
      <main className="flex min-h-screen items-center justify-center bg-background pt-20 px-6">
        <div className="section-card max-w-lg text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-primary text-2xl text-primary-foreground">
            ✓
          </div>
          <h1 className="font-display text-3xl">Thank you, {d["firstNames"]}.</h1>
          <p className="mt-3 text-muted-foreground">
            Your application for <strong className="text-foreground">{d["position"]}</strong> has been
            received. Our Registered Manager will be in touch.
          </p>
        </div>
      </main>
    );

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[340px_1fr]">
      <aside className="bg-sidebar px-8 py-10 text-sidebar-foreground lg:sticky lg:top-0 lg:h-screen">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sidebar-primary">
          Betna Agencies Ltd
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight">Join our care team</h1>
        <p className="mt-3 text-sm leading-relaxed opacity-80">
          Everything you share is kept in confidence. No applicant will be unfairly discriminated
          against.
        </p>
        <ol className="mt-10 hidden space-y-1 lg:block">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  i === step ? "bg-sidebar-accent" : i < step ? "hover:bg-sidebar-accent/60" : "opacity-55"
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                    i <= step
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "border border-sidebar-border"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                <span>
                  <span className="block text-sm font-medium">{s.title}</span>
                  <span className="block text-xs opacity-70">{s.hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-10 hidden text-xs opacity-60 lg:block">
          Need large print or extra time? Contact the Registered Manager.
        </p>
      </aside>

      <main className="mx-auto w-full max-w-3xl px-5 py-10 md:px-10">
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs font-medium text-muted-foreground">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <h2 className="mt-6 font-display text-3xl md:text-4xl">{STEPS[step]?.title}</h2>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            Please complete the highlighted fields before continuing.
          </div>
        )}

        <div className="space-y-6">
          {step === 0 && <StepRole {...f} />}
          {step === 1 && <StepPersonal {...f} />}
          {step === 2 && <StepEducation {...f} />}
          {step === 3 && <StepEmployment {...f} jobs={jobs} addJob={() => setJobs(jobs + 1)} />}
          {step === 4 && <StepRefs {...f} />}
          {step === 5 && <StepDeclare {...f} />}
          {step === 6 && <StepFinal {...f} />}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => { setErrors([]); setStep(Math.max(0, step - 1)); }}
            disabled={step === 0}
            className="rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-0"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
          >
            {step === STEPS.length - 1 ? "Submit application" : "Continue →"}
          </button>
        </div>
      </main>
    </div>
  );
}

function k_email(d: Data) {
  return !!d["email"] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d["email"]);
}

type F = { d: Data; set: (k: string, v: string) => void; errors: string[] };

function Field({ f, k, label, type = "text" as string | undefined, area, span, placeholder }: {
  f: F; k: string; label: string; type?: string | undefined; area?: boolean; span?: boolean; placeholder?: string;
}) {
  const err = f.errors.includes(k);
  const cls = `field-input ${err ? "border-destructive ring-4 ring-destructive/10" : ""}`;
  return (
    <label className={`block ${span ? "md:col-span-2" : ""}`}>
      <span className="field-label">{label}</span>
      {area ? (
        <textarea rows={4} maxLength={3000} className={cls} value={f.d[k] ?? ""} placeholder={placeholder}
          onChange={(e) => f.set(k, e.target.value)} />
      ) : (
        <input type={type} maxLength={255} className={cls} value={f.d[k] ?? ""} placeholder={placeholder}
          onChange={(e) => f.set(k, e.target.value)} />
      )}
    </label>
  );
}

function Choice({ f, k, label, options = ["Yes", "No"] }: { f: F; k: string; label: string; options?: string[] }) {
  const err = f.errors.includes(k);
  return (
    <div className={`flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${err ? "rounded-lg bg-destructive/5 p-2" : ""}`}>
      <span className={`text-sm ${err ? "text-destructive" : "text-foreground"}`}>{label}</span>
      <div className="flex shrink-0 flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" className="chip" data-on={f.d[k] === o} onClick={() => f.set(k, o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Card({ title, sub, children }: { title?: string; sub?: string; children: ReactNode }) {
  return (
    <section className="section-card">
      {title && <h3 className="font-display text-xl">{title}</h3>}
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      <div className={title ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

const Grid = ({ children }: { children: ReactNode }) => (
  <div className="grid gap-5 md:grid-cols-2">{children}</div>
);

function StepRole(f: F) {
  return (
    <>
      <Card>
        <Grid>
          <Field f={f} k="position" label="Position applied for *" placeholder="e.g. Care Assistant" />
          <Field f={f} k="location" label="Location" />
        </Grid>
        <div className="mt-6 space-y-5">
          <Choice f={f} k="workPref" label="Work preference *" options={["Full time", "Part time", "Bank"]} />
          <Field f={f} k="hours" label="Hours requested" placeholder="e.g. 30 per week" />
          <Choice f={f} k="shiftOk" label="I understand this role may include shift work, unsociable hours and lone working." />
        </div>
      </Card>
      <Card title="Your availability" sub="Tap every slot you're available for.">
        <div className="overflow-x-auto">
          <div className="grid min-w-[480px] grid-cols-[60px_repeat(7,1fr)] gap-2">
            <span />
            {DAYS.map((x) => (
              <span key={x} className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">{x}</span>
            ))}
            {SLOTS.map((s) => (
              <Fragment key={s}>
                <span key={s} className="self-center text-xs font-medium text-muted-foreground">{s}</span>
                {DAYS.map((day) => {
                  const k = `avail_${day}_${s}`;
                  const on = f.d[k] === "1";
                  return (
                    <button key={k} type="button" aria-label={`${day} ${s}`} aria-pressed={on}
                      onClick={() => f.set(k, on ? "" : "1")}
                      className={`h-11 rounded-lg border transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-muted hover:border-ring"}`}>
                      {on ? "✓" : ""}
                    </button>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}

function StepPersonal(f: F) {
  return (
    <>
      <Card title="Personal details">
        <Grid>
          <Field f={f} k="firstNames" label="First names *" />
          <Field f={f} k="surname" label="Surname *" />
          <Field f={f} k="maidenName" label="Maiden name" />
          <Field f={f} k="previousNames" label="Previous names" />
          <Field f={f} k="marital" label="Marital status" />
          <Field f={f} k="gender" label="Gender" />
          <Field f={f} k="birthPlace" label="Place of birth" />
          <Field f={f} k="nationality" label="Nationality" />
          <Field f={f} k="passport" label="Passport number" />
          <Field f={f} k="ni" label="NI number" />
        </Grid>
      </Card>
      <Card title="Contact & address">
        <Grid>
          <Field f={f} k="address" label="Current address *" area span />
          <Field f={f} k="postcode" label="Postcode *" />
          <Field f={f} k="movedIn" label="Moved to this address" type="month" />
          <Field f={f} k="phone" label="Telephone" type="tel" />
          <Field f={f} k="mobile" label="Mobile *" type="tel" />
          <Field f={f} k="email" label="Email address *" type="email" span />
          <Field f={f} k="prevAddress" label="Previous addresses (last 5 years) with dates" area span />
        </Grid>
        <p className="note mt-5">For criminal record check purposes, addresses covering the five years up to today must be supplied.</p>
      </Card>
      <Card title="Driving, right to work & adjustments">
        <div className="space-y-5">
          <Choice f={f} k="driver" label="Are you a driver?" />
          <Choice f={f} k="ownTransport" label="Own transport?" options={["Yes", "No", "N/A"]} />
          <Field f={f} k="licenceYears" label="How long have you held a licence?" />
          <Choice f={f} k="endorsements" label="Any endorsements?" options={["Yes", "No", "N/A"]} />
          <Choice f={f} k="ukNational" label="Are you a UK, EC or EEA national?" />
          {f.d["ukNational"] === "No" && (
            <Field f={f} k="immigration" label="Immigration status & visa (including visa number)" area />
          )}
          <Choice f={f} k="related" label="Are you related to any current staff or service users?" />
          <p className="note">
            Under the Equality Act 2010, disability means a physical or mental impairment with a substantial,
            long-term adverse effect on normal day-to-day activities.
          </p>
          <Field f={f} k="adjustments" label="Anything we should know so we can make reasonable adjustments during the process?" area placeholder="Leave blank or write 'Prefer not to say'" />
        </div>
      </Card>
    </>
  );
}

function Repeat({ f, prefix, n, cols }: { f: F; prefix: string; n: number; cols: [string, string, string?][] }) {
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

function StepEducation(f: F) {
  return (
    <>
      <Card title="Education" sub="All qualifications will be subject to a satisfactory check.">
        <Repeat f={f} prefix="edu" n={2} cols={[["school", "School / college / university"], ["quals", "Qualifications"], ["from", "From", "month"], ["to", "To", "month"]]} />
      </Card>
      <Card title="Training courses" sub="Evidence of attendance is required.">
        <Repeat f={f} prefix="train" n={2} cols={[["subject", "Subject"], ["location", "Location"], ["date", "Date", "date"], ["details", "Details"]]} />
      </Card>
      <Card title="Professional memberships">
        <Repeat f={f} prefix="mem" n={1} cols={[["org", "Organisation"], ["reg", "Registration number"], ["renewal", "Renewal date", "date"], ["details", "Details"]]} />
      </Card>
    </>
  );
}

function StepEmployment(f: F & { jobs: number; addJob: () => void }) {
  return (
    <>
      <p className="note">Start with your current or most recent employer. Any gaps must be explained.</p>
      {Array.from({ length: f.jobs }).map((_, i) => (
        <Card key={i} title={i === 0 ? "Current / most recent employer" : `Previous employer ${i}`}>
          <Grid>
            <Field f={f} k={`emp${i}_employer`} label={`Employer name${i === 0 ? " *" : ""}`} />
            <Field f={f} k={`emp${i}_role`} label={`Job role${i === 0 ? " *" : ""}`} />
            <Field f={f} k={`emp${i}_start`} label="Start date" type="month" />
            <Field f={f} k={`emp${i}_end`} label="End date" type="month" />
            <Field f={f} k={`emp${i}_salary`} label="Salary" />
            <Field f={f} k={`emp${i}_contact`} label="Contact name" />
            <Field f={f} k={`emp${i}_tel`} label="Telephone" type="tel" />
            <Field f={f} k={`emp${i}_email`} label="Email" type="email" />
            <Field f={f} k={`emp${i}_address`} label="Address & postcode" span />
            <Field f={f} k={`emp${i}_duties`} label="Duties" area span />
            <Field f={f} k={`emp${i}_reason`} label="Reason for leaving" span />
          </Grid>
        </Card>
      ))}
      <button type="button" onClick={f.addJob}
        className="w-full rounded-2xl border-2 border-dashed border-input py-4 text-sm font-medium text-primary transition hover:border-primary hover:bg-card">
        + Add another employer
      </button>
      <Card title="Explanation of gaps">
        <Field f={f} k="gaps" label="Detail any gaps in employment and why" area />
      </Card>
    </>
  );
}

function StepRefs(f: F) {
  return (
    <>
      <Card title="Next of kin">
        <Grid>
          <Field f={f} k="kinName" label="Full name *" />
          <Field f={f} k="kinRel" label="Relationship" />
          <Field f={f} k="kinTel" label="Telephone *" type="tel" />
          <Field f={f} k="kinAddress" label="Address" />
        </Grid>
      </Card>
      <p className="note">
        Provide references from your two most recent employers, covering the last five years (CQC
        requirement). If unavailable, character references are accepted. All referees will be contacted.
      </p>
      {[1, 2, 3, 4].map((n) => (
        <Card key={n} title={`Referee ${n}${n <= 2 ? " *" : " (optional)"}`}>
          <Grid>
            <Field f={f} k={`ref${n}_name`} label={`Contact name${n <= 2 ? " *" : ""}`} />
            <Field f={f} k={`ref${n}_business`} label="Business name" />
            <Field f={f} k={`ref${n}_tel`} label={`Telephone${n <= 2 ? " *" : ""}`} type="tel" />
            <Field f={f} k={`ref${n}_email`} label="Email" type="email" />
            <Field f={f} k={`ref${n}_address`} label="Address & postcode" />
            <Field f={f} k={`ref${n}_capacity`} label="Capacity in which known" />
          </Grid>
        </Card>
      ))}
    </>
  );
}

function StepDeclare(f: F) {
  return (
    <>
      <Card title="Safeguarding / ex-offenders" sub="Seen only by those involved in recruitment and treated in strictest confidence.">
        <p className="note mb-6">
          Betna Agencies Ltd will not discriminate unfairly on the basis of a criminal conviction. Answering
          "yes" will not necessarily prevent your employment.
        </p>
        <div className="space-y-5">
          <Choice f={f} k="unspentConv" label="Are you bound over or do you have any current UNSPENT convictions? *" />
          <Choice f={f} k="unspentCaution" label="Any current UNSPENT police cautions, reprimands or final warnings? *" />
          <Choice f={f} k="prevConv" label="Any previous convictions, cautions or reprimands? *" />
          {[f.d["unspentConv"], f.d["unspentCaution"], f.d["prevConv"]].includes("Yes") && (
            <Field f={f} k="convDetails" label="Please explain" area />
          )}
        </div>
      </Card>
      <Card title="Privacy statement">
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>We only collect data for legitimate use in the recruitment process and keep it until the vacancy is filled, after which we delete it or ask to keep it for future roles.</p>
          <p>You may request your data be forgotten, rectified, accessed or restricted, or withdraw consent at any time by contacting the Registered Manager.</p>
        </div>
      </Card>
      <Card title="Declaration">
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          The information in this application is true and complete. Any deliberate omission, falsification or
          misrepresentation will be grounds for rejection or dismissal.
        </p>
        <Grid>
          <Field f={f} k="declName" label="Full name (as signature) *" />
          <Field f={f} k="declDate" label="Date" type="date" />
        </Grid>
        <label className={`mt-5 flex items-start gap-3 text-sm ${f.errors.includes("declAgree") ? "text-destructive" : ""}`}>
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" checked={f.d["declAgree"] === "1"}
            onChange={(e) => f.set("declAgree", e.target.checked ? "1" : "")} />
          I agree to the declaration and privacy statement above. *
        </label>
      </Card>
    </>
  );
}

function StepFinal(f: F) {
  return (
    <>
      <Card title="Supporting statement" sub="Your reasons for applying, strengths and skills from work, home and other activities.">
        <Field f={f} k="statement" label="Your statement" area />
      </Card>
      <Card title="Bank details" sub="Used for payroll if your application is successful.">
        <Grid>
          <Field f={f} k="bankName" label="Name on the account" />
          <Field f={f} k="bank" label="Bank" />
          <Field f={f} k="account" label="Account number" />
          <Field f={f} k="sort" label="Sort code" placeholder="00-00-00" />
        </Grid>
      </Card>
    </>
  );
}
