"use client";

import { Fragment } from "react";
import { Check, Plus } from "lucide-react";
import { DAYS, MAX_EMPLOYERS, SLOTS } from "@/lib/application";
import { Card, Checkbox, Choice, Field, Grid, Repeat, type F } from "./form-fields";

export function StepRole(f: F) {
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
          <Choice
            f={f}
            k="shiftOk"
            label="I understand this role may include shift work, unsociable hours and lone working."
          />
        </div>
      </Card>
      <Card title="Your availability" sub="Tap every slot you're available for.">
        <div className="overflow-x-auto">
          <div className="grid min-w-120 grid-cols-[60px_repeat(7,1fr)] gap-2">
            <span />
            {DAYS.map((x) => (
              <span
                key={x}
                className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {x}
              </span>
            ))}
            {SLOTS.map((s) => (
              <Fragment key={s}>
                <span className="self-center text-xs font-medium text-muted-foreground">{s}</span>
                {DAYS.map((day) => {
                  const k = `avail_${day}_${s}`;
                  const on = f.d[k] === "1";
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-label={`${day} ${s}`}
                      aria-pressed={on}
                      onClick={() => f.set(k, on ? "" : "1")}
                      className={`grid h-11 cursor-pointer place-items-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 ${
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-muted hover:border-ring"
                      }`}
                    >
                      {on && <Check className="h-4 w-4" aria-hidden="true" />}
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

export function StepPersonal(f: F) {
  return (
    <>
      <Card title="Personal details">
        <Grid>
          <Field f={f} k="firstNames" label="First names *" autoComplete="given-name" />
          <Field f={f} k="surname" label="Surname *" autoComplete="family-name" />
          <Field f={f} k="maidenName" label="Maiden name" />
          <Field f={f} k="previousNames" label="Previous names" />
          <Field f={f} k="marital" label="Marital status" />
          <Field f={f} k="gender" label="Gender" />
          <Field f={f} k="birthPlace" label="Place of birth" />
          <Field f={f} k="nationality" label="Nationality" />
          <Field f={f} k="passport" label="Passport number" />
          <Field f={f} k="ni" label="NI number" placeholder="QQ 12 34 56 C" />
        </Grid>
      </Card>
      <Card title="Contact & address">
        <Grid>
          <Field f={f} k="address" label="Current address *" area span autoComplete="street-address" />
          <Field f={f} k="postcode" label="Postcode *" autoComplete="postal-code" />
          <Field f={f} k="movedIn" label="Moved to this address"  />
          <Field f={f} k="phone" label="Telephone" type="tel" autoComplete="tel" />
          <Field f={f} k="mobile" label="Mobile *" type="tel" autoComplete="tel" />
          <Field f={f} k="email" label="Email address *" type="email" span autoComplete="email" />
          <Field f={f} k="prevAddress" label="Previous addresses (last 5 years) with dates" area span />
        </Grid>
        <p className="note mt-5">
          For criminal record check purposes, addresses covering the five years up to today must be supplied.
        </p>
      </Card>
      <Card title="Driving, right to work & adjustments">
        <div className="space-y-5">
          <Choice f={f} k="driver" label="Are you a driver?" />
          <Choice f={f} k="ownTransport" label="Own transport?" options={["Yes", "No", "N/A"]} />
          <Field f={f} k="licenceYears" label="How long have you held a licence?" />
          <Choice f={f} k="endorsements" label="Any endorsements?" options={["Yes", "No", "N/A"]} />
          <Choice f={f} k="ukNational" label="Are you a UK, EC or EEA national?" />
          {f.d["ukNational"] === "No" && (
            <Field f={f} k="immigration" label="Immigration status & visa (including visa number) *" area />
          )}
          <Choice f={f} k="related" label="Are you related to any current staff or service users?" />
          <p className="note">
            Under the Equality Act 2010, disability means a physical or mental impairment with a substantial,
            long-term adverse effect on normal day-to-day activities.
          </p>
          <Field
            f={f}
            k="adjustments"
            label="Anything we should know so we can make reasonable adjustments during the process?"
            area
            placeholder="Leave blank or write 'Prefer not to say'"
          />
        </div>
      </Card>
    </>
  );
}

export function StepEducation(f: F) {
  return (
    <>
      <Card title="Education" sub="All qualifications will be subject to a satisfactory check.">
        <Repeat
          f={f}
          prefix="edu"
          n={2}
          cols={[
            ["school", "School / college / university"],
            ["quals", "Qualifications"],
            ["from", "From", "month"],
            ["to", "To", "month"],
          ]}
        />
      </Card>
      <Card title="Training courses" sub="Evidence of attendance is required.">
        <Repeat
          f={f}
          prefix="train"
          n={2}
          cols={[
            ["subject", "Subject"],
            ["location", "Location"],
            ["date", "Date", "date"],
            ["details", "Details"],
          ]}
        />
      </Card>
      <Card title="Professional memberships">
        <Repeat
          f={f}
          prefix="mem"
          n={1}
          cols={[
            ["org", "Organisation"],
            ["reg", "Registration number"],
            ["renewal", "Renewal date", "date"],
            ["details", "Details"],
          ]}
        />
      </Card>
    </>
  );
}

export function StepEmployment(f: F & { jobs: number; addJob: () => void }) {
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
      {f.jobs < MAX_EMPLOYERS && (
        <button
          type="button"
          onClick={f.addJob}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-input py-4 text-sm font-medium text-primary transition hover:border-primary hover:bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add another employer
        </button>
      )}
      <Card title="Explanation of gaps">
        <Field f={f} k="gaps" label="Detail any gaps in employment and why" area />
      </Card>
    </>
  );
}

export function StepRefs(f: F) {
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
        Provide references from your two most recent employers, covering the last five years (CQC requirement).
        If unavailable, character references are accepted. All referees will be contacted.
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

export function StepDeclare(f: F) {
  const anyYes = [f.d["unspentConv"], f.d["unspentCaution"], f.d["prevConv"]].includes("Yes");
  return (
    <>
      <Card
        title="Safeguarding / ex-offenders"
        sub="Seen only by those involved in recruitment and treated in strictest confidence."
      >
        <p className="note mb-6">
         Moreloved Care will not discriminate unfairly on the basis of a criminal conviction. Answering
          &quot;yes&quot; will not necessarily prevent your employment.
        </p>
        <div className="space-y-5">
          <Choice f={f} k="unspentConv" label="Are you bound over or do you have any current UNSPENT convictions? *" />
          <Choice f={f} k="unspentCaution" label="Any current UNSPENT police cautions, reprimands or final warnings? *" />
          <Choice f={f} k="prevConv" label="Any previous convictions, cautions or reprimands? *" />
          {anyYes && <Field f={f} k="convDetails" label="Please explain *" area />}
        </div>
      </Card>
      <Card title="Privacy statement">
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We only collect data for legitimate use in the recruitment process and keep it until the vacancy is
            filled, after which we delete it or ask to keep it for future roles.
          </p>
          <p>
            You may request your data be forgotten, rectified, accessed or restricted, or withdraw consent at any
            time by contacting the Registered Manager.
          </p>
        </div>
      </Card>
      <Card title="Declaration">
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          The information in this application is true and complete. Any deliberate omission, falsification or
          misrepresentation will be grounds for rejection or dismissal.
        </p>
        <Grid>
          <Field f={f} k="declName" label="Full name (as signature) *" autoComplete="name" />
          <Field f={f} k="declDate" label="Date *" type="date" />
        </Grid>
        <Checkbox f={f} k="declAgree">
          I agree to the declaration and privacy statement above. *
        </Checkbox>
      </Card>
    </>
  );
}

export function StepFinal(f: F) {
  return (
    <>
      <Card
        title="Supporting statement"
        sub="Your reasons for applying, strengths and skills from work, home and other activities."
      >
        <Field f={f} k="statement" label="Your statement" area />
      </Card>
      <Card title="Bank details" sub="Used for payroll if your application is successful.">
        <Grid>
          <Field f={f} k="bankName" label="Name on the account" />
          <Field f={f} k="bank" label="Bank" />
          <Field f={f} k="account" label="Account number" inputMode="numeric" placeholder="8 digits" />
          <Field f={f} k="sort" label="Sort code" inputMode="numeric" placeholder="00-00-00" />
        </Grid>
      </Card>
    </>
  );
}
