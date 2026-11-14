import { DAYS, SLOTS, employerCount, type ApplicationData } from "./application";

type Row = [label: string, key: string];
type Section = { title: string; rows: [string, string][] };

const yesNo = (v: string) => (v === "1" ? "Yes" : v);

function section(d: ApplicationData, title: string, rows: Row[]): Section | null {
  const filled = rows
    .map(([label, key]) => [label, yesNo(d[key]?.trim() ?? "")] as [string, string])
    .filter(([, v]) => v);
  return filled.length ? { title, rows: filled } : null;
}

function availability(d: ApplicationData) {
  return DAYS.map((day) => {
    const slots = SLOTS.filter((s) => d[`avail_${day}_${s}`] === "1");
    return slots.length ? `${day}: ${slots.join(", ")}` : "";
  })
    .filter(Boolean)
    .join("\n");
}

export function buildSections(d: ApplicationData): Section[] {
  const sections: (Section | null)[] = [];
  const avail = availability(d);

  sections.push(
    section({ ...d, __avail: avail }, "The role", [
      ["Position applied for", "position"],
      ["Location", "location"],
      ["Work preference", "workPref"],
      ["Hours requested", "hours"],
      ["Accepts shift / lone working", "shiftOk"],
      ["Availability", "__avail"],
    ]),
    section(d, "Personal details", [
      ["First names", "firstNames"],
      ["Surname", "surname"],
      ["Maiden name", "maidenName"],
      ["Previous names", "previousNames"],
      ["Marital status", "marital"],
      ["Gender", "gender"],
      ["Place of birth", "birthPlace"],
      ["Nationality", "nationality"],
      ["Passport number", "passport"],
      ["NI number", "ni"],
    ]),
    section(d, "Contact & address", [
      ["Current address", "address"],
      ["Postcode", "postcode"],
      ["Moved to this address", "movedIn"],
      ["Telephone", "phone"],
      ["Mobile", "mobile"],
      ["Email", "email"],
      ["Previous addresses", "prevAddress"],
    ]),
    section(d, "Driving, right to work & adjustments", [
      ["Driver", "driver"],
      ["Own transport", "ownTransport"],
      ["Licence held for", "licenceYears"],
      ["Endorsements", "endorsements"],
      ["UK, EC or EEA national", "ukNational"],
      ["Immigration status & visa", "immigration"],
      ["Related to staff / service users", "related"],
      ["Reasonable adjustments", "adjustments"],
    ]),
  );

  for (let i = 0; i < 2; i++) {
    sections.push(
      section(d, `Education ${i + 1}`, [
        ["School / college / university", `edu${i}_school`],
        ["Qualifications", `edu${i}_quals`],
        ["From", `edu${i}_from`],
        ["To", `edu${i}_to`],
      ]),
    );
  }
  for (let i = 0; i < 2; i++) {
    sections.push(
      section(d, `Training course ${i + 1}`, [
        ["Subject", `train${i}_subject`],
        ["Location", `train${i}_location`],
        ["Date", `train${i}_date`],
        ["Details", `train${i}_details`],
      ]),
    );
  }
  sections.push(
    section(d, "Professional membership", [
      ["Organisation", "mem0_org"],
      ["Registration number", "mem0_reg"],
      ["Renewal date", "mem0_renewal"],
      ["Details", "mem0_details"],
    ]),
  );

  for (let i = 0; i < employerCount(d); i++) {
    sections.push(
      section(d, i === 0 ? "Current / most recent employer" : `Previous employer ${i}`, [
        ["Employer", `emp${i}_employer`],
        ["Job role", `emp${i}_role`],
        ["Start date", `emp${i}_start`],
        ["End date", `emp${i}_end`],
        ["Salary", `emp${i}_salary`],
        ["Contact name", `emp${i}_contact`],
        ["Telephone", `emp${i}_tel`],
        ["Email", `emp${i}_email`],
        ["Address & postcode", `emp${i}_address`],
        ["Duties", `emp${i}_duties`],
        ["Reason for leaving", `emp${i}_reason`],
      ]),
    );
  }
  sections.push(
    section(d, "Employment gaps", [["Explanation", "gaps"]]),
    section(d, "Next of kin", [
      ["Full name", "kinName"],
      ["Relationship", "kinRel"],
      ["Telephone", "kinTel"],
      ["Address", "kinAddress"],
    ]),
  );

  for (let n = 1; n <= 4; n++) {
    sections.push(
      section(d, `Referee ${n}`, [
        ["Contact name", `ref${n}_name`],
        ["Business name", `ref${n}_business`],
        ["Telephone", `ref${n}_tel`],
        ["Email", `ref${n}_email`],
        ["Address & postcode", `ref${n}_address`],
        ["Capacity in which known", `ref${n}_capacity`],
      ]),
    );
  }

  sections.push(
    section(d, "Safeguarding", [
      ["Unspent convictions / bound over", "unspentConv"],
      ["Unspent cautions / reprimands", "unspentCaution"],
      ["Previous convictions / cautions", "prevConv"],
      ["Details", "convDetails"],
    ]),
    section(d, "Declaration", [
      ["Signed", "declName"],
      ["Date", "declDate"],
      ["Agreed to declaration & privacy", "declAgree"],
    ]),
    section(d, "Supporting statement", [["Statement", "statement"]]),
    section(d, "Bank details", [
      ["Name on account", "bankName"],
      ["Bank", "bank"],
      ["Account number", "account"],
      ["Sort code", "sort"],
    ]),
  );

  return sections.filter((s): s is Section => s !== null);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function renderApplicationHtml(d: ApplicationData) {
  const name = escapeHtml(`${d["firstNames"] ?? ""} ${d["surname"] ?? ""}`.trim());
  const body = buildSections(d)
    .map(
      (s) => `
      <h2 style="margin:28px 0 8px;font-size:16px;color:#1f4d4a;border-bottom:1px solid #e4ded3;padding-bottom:6px">${escapeHtml(s.title)}</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${s.rows
          .map(
            ([label, v]) => `<tr>
              <td style="padding:6px 12px 6px 0;color:#6b6560;vertical-align:top;width:40%">${escapeHtml(label)}</td>
              <td style="padding:6px 0;color:#1d1b19;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f7f4ee;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#ffffff">
      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c0643f">New job application</p>
      <h1 style="margin:8px 0 4px;font-size:24px;color:#1d1b19">${name}</h1>
      <p style="margin:0;color:#6b6560">${escapeHtml(d["position"] ?? "")}</p>
      ${body}
    </div>
  </body></html>`;
}

export function renderApplicationText(d: ApplicationData) {
  return buildSections(d)
    .map((s) => `${s.title.toUpperCase()}\n${s.rows.map(([l, v]) => `${l}: ${v}`).join("\n")}`)
    .join("\n\n");
}

export function renderConfirmationHtml(d: ApplicationData) {
  return `<!doctype html><html><body style="margin:0;background:#f7f4ee;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff;color:#1d1b19">
      <h1 style="font-size:22px;margin:0 0 12px">Thank you, ${escapeHtml(d["firstNames"] ?? "")}.</h1>
      <p style="line-height:1.6">We have received your application for <strong>${escapeHtml(d["position"] ?? "")}</strong> at Moreloved Care. Our Registered Manager will review it and be in touch.</p>
      <p style="line-height:1.6;color:#6b6560;font-size:13px">If you didn't submit this application, please reply to let us know.</p>
    </div>
  </body></html>`;
}
