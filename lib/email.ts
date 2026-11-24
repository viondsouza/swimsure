import "server-only";
import nodemailer from "nodemailer";
import { DETAIL_ROWS, KIND_LABEL, type Enquiry } from "./enquiry";

/**
 * Emails go out through a Gmail account using an "app password".
 *   GMAIL_USER          the Gmail address that sends the emails
 *   GMAIL_APP_PASSWORD  16-letter app password from myaccount.google.com/apppasswords
 *   NOTIFY_EMAIL        where new-enquiry alerts go (defaults to GMAIL_USER)
 */
export function emailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

function transport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, ""),
    },
  });
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const firstName = (name: string) => name.trim().split(/\s+/)[0] || "there";

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f3ee;font-family:Inter,Arial,sans-serif;color:#0f2442">
  <div style="max-width:560px;margin:0 auto;padding:28px 20px">
    <div style="background:#0f2442;color:#f5f3ee;border-radius:14px 14px 0 0;padding:20px 24px">
      <div style="font-size:22px;font-weight:800;letter-spacing:-0.02em">SwimSure</div>
      <div style="font-size:13px;color:#9cc0f0;margin-top:2px">A swim school inside your society's pool</div>
    </div>
    <div style="background:#ffffff;border:1px solid #e1e4ea;border-top:0;border-radius:0 0 14px 14px;padding:24px">
      <h1 style="font-size:19px;margin:0 0 14px">${title}</h1>
      ${body}
    </div>
    <p style="font-size:12px;color:#5b6b82;text-align:center;margin-top:16px">SwimSure · Bengaluru</p>
  </div></body></html>`;
}

function detailsTable(e: Enquiry) {
  const rows = DETAIL_ROWS.filter(([k]) => e[k])
    .map(([k, label]) => {
      const v = k === "kind" ? KIND_LABEL[e.kind] : e[k];
      return `<tr><td style="padding:6px 10px 6px 0;color:#5b6b82;vertical-align:top;white-space:nowrap">${label}</td>
        <td style="padding:6px 0;font-weight:600">${esc(v).replace(/\n/g, "<br>")}</td></tr>`;
    })
    .join("");
  return `<table style="border-collapse:collapse;font-size:14px;width:100%">${rows}</table>`;
}

/** Text for the automatic reply, written for each kind of person. */
function autoReply(e: Enquiry) {
  const hi = `<p style="font-size:15px;line-height:1.6;margin:0 0 12px">Hi ${esc(firstName(e.name))},</p>`;
  const sign = `<p style="font-size:15px;line-height:1.6;margin:16px 0 0">Warmly,<br><b>Vion Dsouza</b><br>Founder, SwimSure</p>`;
  const p = (t: string) => `<p style="font-size:15px;line-height:1.6;margin:0 0 12px">${t}</p>`;
  const list = (items: string[]) =>
    `<ul style="font-size:15px;line-height:1.7;margin:0 0 12px;padding-left:20px">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  if (e.kind === "society") {
    return {
      subject: "Thanks! Let's bring SwimSure to your society",
      html: shell(
        "We'd love to run lessons at your pool",
        hi +
          p(`Thank you for writing in${e.society ? ` about <b>${esc(e.society)}</b>` : ""}. I'll call you within one working day to set up a 15-minute chat with your committee.`) +
          p("Here's the short version of how it works:") +
          list([
            "Your society gives SwimSure exclusive rights to run lessons in the pool.",
            "We provide <b>one certified coach and one lifeguard</b> at every class, plus insurance. No batch runs short-staffed.",
            "A <b>1-year written agreement</b>, and there's no cost to the society.",
            "Parents prepay us by UPI, and your society receives <b>15% of the fees</b> every month.",
            "We start with a <b>free water-safety day</b> for every child at your pool.",
          ]) +
          p("If you have a pool rulebook or timings, feel free to reply to this email with them.") +
          sign,
      ),
    };
  }
  if (e.kind === "coach") {
    return {
      subject: "Thanks for wanting to coach with SwimSure",
      html: shell(
        "Thanks for reaching out",
        hi +
          p("Thank you for your interest in coaching with SwimSure. We offer salaried evening work: small batches of up to 10 children, Monday, Wednesday and Friday from 5 to 8 pm, inside apartment-society pools across Bengaluru, with a lifeguard on deck at every class.") +
          p("I'll read your details and get back to you within a few days. If you have certificates (STA, lifeguard or first aid), reply to this email with a photo of them.") +
          sign,
      ),
    };
  }
  return {
    subject: "Thanks! Your SwimSure enquiry is in",
    html: shell(
      "We've got your enquiry",
      hi +
        p(`Thank you for your interest in swimming lessons${e.society ? ` at <b>${esc(e.society)}</b>` : ""}. We'll call or WhatsApp you within one working day.`) +
        p("What to expect:") +
        list([
          "Lessons <b>inside your own society's pool</b>, so there's no travel.",
          "A <b>certified coach and a lifeguard</b> at every class, with up to 10 children per batch.",
          "Children aged <b>5 to 12</b>, on Monday, Wednesday and Friday evenings, in batches between 5 and 8 pm.",
          "<b>₹5,400 a month for 12 classes</b> (₹450 a class), paid in advance by UPI. Fees are before GST.",
          "A <b>free water-safety day</b> at the pool before you pay anything. Our first pilot opens in early 2027.",
        ]) +
        p("If your society doesn't have SwimSure yet, we'll talk to your committee. The more parents who ask, the faster it happens.") +
        sign,
    ),
  };
}

export async function sendEnquiryEmails(e: Enquiry) {
  const from = `SwimSure <${process.env.GMAIL_USER}>`;
  const notifyTo = process.env.NOTIFY_EMAIL || process.env.GMAIL_USER!;
  const mail = transport();
  const reply = autoReply(e);

  const results = await Promise.allSettled([
    // 1. Alert to you
    mail.sendMail({
      from,
      to: notifyTo,
      replyTo: { name: e.name, address: e.email },
      subject: `New ${KIND_LABEL[e.kind].toLowerCase()} enquiry: ${e.name}${e.society ? ` (${e.society})` : ""}`,
      html: shell(
        `New ${KIND_LABEL[e.kind].toLowerCase()} enquiry`,
        detailsTable(e) +
          `<p style="font-size:13px;color:#5b6b82;margin:16px 0 0">Hit reply to answer ${esc(firstName(e.name))} directly. It's also saved in Supabase → enquiries.</p>`,
      ),
    }),
    // 2. Automatic reply to the person who filled the form
    mail.sendMail({ from, to: e.email, replyTo: notifyTo, subject: reply.subject, html: reply.html }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[email] ${i === 0 ? "alert" : "auto-reply"} failed:`, r.reason);
  });
  return { alert: results[0].status === "fulfilled", autoReply: results[1].status === "fulfilled" };
}
