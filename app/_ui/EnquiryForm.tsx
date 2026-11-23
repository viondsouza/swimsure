"use client";

import { useActionState, useEffect, useState } from "react";
import { submitEnquiry, type FormState } from "../actions";
import type { Kind } from "@/lib/enquiry";

const TABS: { kind: Kind; label: string; hint: string }[] = [
  { kind: "parent", label: "I'm a parent", hint: "Book a free demo day for your child." },
  { kind: "society", label: "Society committee", hint: "Bring SwimSure to your pool, at no cost." },
  { kind: "coach", label: "Coach / lifeguard", hint: "Steady evening work close to home." },
];

const initial: FormState = { ok: false, message: "" };

export default function EnquiryForm() {
  const [kind, setKind] = useState<Kind>("parent");
  const [state, formAction, pending] = useActionState(submitEnquiry, initial);

  // Links like #enquire-society pick the right tab.
  useEffect(() => {
    const fromHash = () => {
      const k = window.location.hash.replace("#enquire-", "") as Kind;
      if (TABS.some((t) => t.kind === k)) setKind(k);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  if (state.ok) {
    return (
      <div className="form-done" role="status">
        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden>
          <circle cx="24" cy="24" r="22" fill="#2a6fd6" />
          <path d="M14 25 l7 7 l13 -15" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3>You&apos;re in.</h3>
        <p>{state.message}</p>
        {!state.demo && <p className="muted">We&apos;ve also sent a confirmation to your email. Check your spam folder if you don&apos;t see it.</p>}
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values ?? {};
  const field = (name: keyof NonNullable<FormState["errors"]>) =>
    err[name] ? { "aria-invalid": true, "aria-describedby": `${name}-err` } : {};
  const errText = (name: keyof NonNullable<FormState["errors"]>) =>
    err[name] ? (
      <span className="field-err" id={`${name}-err`}>
        {err[name]}
      </span>
    ) : null;

  return (
    <form action={formAction} className="form" noValidate>
      <div className="tabs" role="radiogroup" aria-label="I am a">
        {TABS.map((t) => (
          <label key={t.kind} className={`tab ${kind === t.kind ? "on" : ""}`}>
            <input type="radio" name="kind-tab" value={t.kind} checked={kind === t.kind} onChange={() => setKind(t.kind)} />
            {t.label}
          </label>
        ))}
      </div>
      {/* The chosen tab is sent from here; a form reset can't flip it like it can a radio. */}
      <input type="hidden" name="kind" value={kind} />
      <p className="tab-hint">{TABS.find((t) => t.kind === kind)!.hint}</p>

      {/* spam trap, hidden from people */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="trap" aria-hidden />

      <div className="grid2">
        <label className="field">
          <span>Your name</span>
          <input name="name" defaultValue={v.name} autoComplete="name" required {...field("name")} />
          {errText("name")}
        </label>
        <label className="field">
          <span>Phone (WhatsApp)</span>
          <input name="phone" defaultValue={v.phone} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" required {...field("phone")} />
          {errText("phone")}
        </label>
      </div>

      <label className="field">
        <span>Email</span>
        <input name="email" defaultValue={v.email} type="email" autoComplete="email" placeholder="you@example.com" required {...field("email")} />
        {errText("email")}
      </label>

      <label className="field">
          <span>
            {kind === "coach" ? "Areas you can work in" : "Society / apartment name"}
            {kind !== "society" && <em> (optional)</em>}
          </span>
          <input
            name="society"
            defaultValue={v.society}
            placeholder={kind === "coach" ? "e.g. Whitefield, Sarjapur" : "e.g. Prestige Lakeside Habitat"}
            {...field("society")}
          />
          {errText("society")}
        </label>

      {kind === "parent" && (
        <label className="field">
          <span>
            Child&apos;s age <em>(optional)</em>
          </span>
          <select name="child_age" defaultValue={v.child_age ?? ""}>
            <option value="">Choose</option>
            {["5", "6", "7", "8", "9", "10", "11", "12", "More than one child", "Other"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      )}
      {kind === "society" && (
        <label className="field">
          <span>
            Number of flats <em>(optional)</em>
          </span>
          <select name="flats" defaultValue={v.flats ?? ""}>
            <option value="">Choose</option>
            {["Under 300", "300–700", "700–1,000", "1,000+"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      )}
      {kind === "coach" && (
        <label className="field">
          <span>
            Experience and certificates <em>(optional)</em>
          </span>
          <input name="experience" defaultValue={v.experience} placeholder="e.g. 4 years, STA level 2, lifeguard certified" />
        </label>
      )}

      <label className="field">
        <span>
          Anything else? <em>(optional)</em>
        </span>
        <textarea name="message" defaultValue={v.message} rows={3} placeholder={kind === "society" ? "Pool size, timings, who to talk to…" : "Questions, preferred timings…"} />
      </label>

      {state.message && !state.ok && (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      )}

      <button className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Sending…" : kind === "parent" ? "Book my free demo day" : kind === "society" ? "Request a committee chat" : "Send my details"}
      </button>
      <p className="fine">We reply within one working day. No spam, ever.</p>
    </form>
  );
}
