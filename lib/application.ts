export type ApplicationData = Partial<Record<string, string>>;
export type FieldErrors = Record<string, string>;

export const STEPS = [
  { title: "The role", hint: "Position & availability" },
  { title: "About you", hint: "Personal details" },
  { title: "Education", hint: "Qualifications & training" },
  { title: "Employment", hint: "Work history" },
  { title: "Next of kin & references", hint: "Who we can contact" },
  { title: "Declarations", hint: "Safeguarding & privacy" },
  { title: "Statement & bank", hint: "Final details" },
] as const;

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const SLOTS = ["AM", "PM", "Eve"] as const;

export const MAX_EMPLOYERS = 10;
export const MAX_FIELD_LENGTH = 3000;

const REQUIRED: Record<number, string[]> = {
  0: ["position", "workPref"],
  1: ["firstNames", "surname", "address", "postcode", "mobile", "email"],
  3: ["emp0_employer", "emp0_role"],
  4: ["kinName", "kinTel", "ref1_name", "ref1_tel", "ref2_name", "ref2_tel"],
  5: ["unspentConv", "unspentCaution", "prevConv", "declName", "declDate", "declAgree"],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


const SORT_CODE_RE = /^\d{2}-?\d{2}-?\d{2}$/;
const ACCOUNT_RE = /^\d{8}$/;

const value = (d: ApplicationData, k: string) => d[k]?.trim() ?? "";

function isPhone(v: string) {
  return /^\+?\d{7,15}$/.test(v.replace(/[\s()-]/g, ""));
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function employerCount(d: ApplicationData) {
  let max = 0;
  for (const key of Object.keys(d)) {
    const match = /^emp(\d+)_/.exec(key);
    if (match && d[key]?.trim()) max = Math.max(max, Number(match[1]) + 1);
  }
  return Math.min(Math.max(max, 1), MAX_EMPLOYERS);
}

export function validateStep(step: number, d: ApplicationData): FieldErrors {
  const errors: FieldErrors = {};
  const fail = (k: string, msg: string) => {
    if (!errors[k]) errors[k] = msg;
  };

  for (const k of REQUIRED[step] ?? []) {
    if (!value(d, k)) fail(k, k === "declAgree" ? "Please tick to confirm the declaration." : "This field is required.");
  }

  const emailFields: string[] = [];
  const phoneFields: string[] = [];

  if (step === 1) {
    emailFields.push("email");
    phoneFields.push("mobile", "phone");
   
   
    if (d["ukNational"] === "No" && !value(d, "immigration"))
      fail("immigration", "Please give your immigration status and visa details.");
  
  }

  if (step === 2) {
    for (let i = 0; i < 2; i++) {
      const from = value(d, `edu${i}_from`);
      const to = value(d, `edu${i}_to`);
      if (from && to && from > to) fail(`edu${i}_to`, "End date must be after the start date.");
    }
  }

  if (step === 3) {
    for (let i = 0; i < MAX_EMPLOYERS; i++) {
      emailFields.push(`emp${i}_email`);
      phoneFields.push(`emp${i}_tel`);
      const start = value(d, `emp${i}_start`);
      const end = value(d, `emp${i}_end`);
      if (start && end && start > end) fail(`emp${i}_end`, "End date must be after the start date.");
    }
  }

  if (step === 4) {
    phoneFields.push("kinTel");
    for (let n = 1; n <= 4; n++) {
      emailFields.push(`ref${n}_email`);
      phoneFields.push(`ref${n}_tel`);
    }
  }

  if (step === 5) {
    const anyYes = [d["unspentConv"], d["unspentCaution"], d["prevConv"]].includes("Yes");
    if (anyYes && !value(d, "convDetails")) fail("convDetails", "Please provide details.");
    if (value(d, "declDate") && value(d, "declDate") > todayISO())
      fail("declDate", "This date can't be in the future.");
    if (value(d, "declName") && value(d, "firstNames") && value(d, "surname")) {
      const sig = value(d, "declName").toLowerCase();
      if (!sig.includes(value(d, "surname").toLowerCase()))
        fail("declName", "Please sign with your full name, including your surname.");
    }
  }

  if (step === 6) {
    if (value(d, "sort") && !SORT_CODE_RE.test(value(d, "sort")))
      fail("sort", "Enter a 6-digit sort code, e.g. 12-34-56.");
    if (value(d, "account") && !ACCOUNT_RE.test(value(d, "account").replace(/\s/g, "")))
      fail("account", "Account numbers are 8 digits.");
  }

  for (const k of emailFields) {
    if (value(d, k) && !EMAIL_RE.test(value(d, k))) fail(k, "Enter a valid email address.");
  }
  for (const k of phoneFields) {
    if (value(d, k) && !isPhone(value(d, k))) fail(k, "Enter a valid phone number.");
  }

  return errors;
}

export function validateAll(d: ApplicationData): { step: number; errors: FieldErrors } | null {
  for (let step = 0; step < STEPS.length; step++) {
    const errors = validateStep(step, d);
    if (Object.keys(errors).length) return { step, errors };
  }
  return null;
}
