"use server";

import { createClient } from "@supabase/supabase-js";
import { emailConfigured, sendEnquiryEmails } from "@/lib/email";
import type { Enquiry, Kind } from "@/lib/enquiry";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<keyof Enquiry, string>>;
  demo?: boolean;
  values?: Partial<Enquiry>;
};

const KINDS: Kind[] = ["parent", "society", "coach"];

const text = (fd: FormData, key: string, max = 200) =>
  String(fd.get(key) ?? "").trim().slice(0, max);

export async function submitEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  // Spam trap: real people never see or fill this field.
  if (text(fd, "website")) return { ok: true, message: "Thanks!" };

  const kindRaw = text(fd, "kind") as Kind;
  const e: Enquiry = {
    kind: KINDS.includes(kindRaw) ? kindRaw : "parent",
    name: text(fd, "name", 120),
    email: text(fd, "email", 200).toLowerCase(),
    phone: text(fd, "phone", 30),
    society: text(fd, "society"),
    area: text(fd, "area"),
    child_age: text(fd, "child_age", 40),
    flats: text(fd, "flats", 40),
    experience: text(fd, "experience", 400),
    message: text(fd, "message", 2000),
  };

  const errors: FormState["errors"] = {};
  if (e.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.email)) errors.email = "Please enter a valid email.";
  if (e.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a 10-digit phone number.";
  if (e.kind === "society" && !e.society) errors.society = "Which society is this for?";
  if (Object.keys(errors).length) return { ok: false, message: "Please fix the highlighted fields.", errors, values: e };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  // Before Supabase is connected, the form still works so the site can be demoed.
  if (!url || !key) {
    console.warn("[enquiry] Supabase not set up yet. Not saved:", e);
    return {
      ok: true,
      demo: true,
      message: "Thanks! (Demo mode: the database isn't connected yet, so this wasn't saved.)",
    };
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const blankToNull = Object.fromEntries(Object.entries(e).map(([k, v]) => [k, v === "" ? null : v]));
  const { error } = await supabase.from("enquiries").insert(blankToNull);
  if (error) {
    console.error("[enquiry] Supabase insert failed:", error);
    return {
      ok: false,
      message: "Sorry, something went wrong saving your details. Please try again, or message us on WhatsApp.",
      values: e,
    };
  }

  if (emailConfigured()) {
    await sendEnquiryEmails(e);
  } else {
    console.warn("[enquiry] Gmail not set up yet, so no emails were sent.");
  }

  const firstName = e.name.split(/\s+/)[0];
  return {
    ok: true,
    message:
      e.kind === "society"
        ? `Thank you, ${firstName}! We'll call you within one working day to set up a chat with your committee.`
        : e.kind === "coach"
          ? `Thank you, ${firstName}! We'll review your details and get back to you soon.`
          : `Thank you, ${firstName}! We'll call or WhatsApp you within one working day.`,
  };
}
