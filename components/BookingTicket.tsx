"use client";

import { useRef, useState } from "react";

const TYPES = ["Show / event", "Brand collab", "Workshop", "Press", "Other"] as const;
type Status = "idle" | "sending" | "sent" | "error";

/** "Book the krew" ticket. Sends to /api/booking, which emails the krew's Gmail. Styles: .tk-ticket in globals.css */
export default function BookingTicket() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [booked, setBooked] = useState({ name: "", type: "", date: "", code: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    for (const [key, label] of [["name", "your name"], ["contact", "a phone, email or IG"], ["message", "a few details"]] as const) {
      if (!data[key]?.trim()) {
        setError(`Add ${label} so we can reply.`);
        (form.elements.namedItem(key) as HTMLElement | null)?.focus();
        return;
      }
    }

    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Couldn't send");
      setBooked({ name: data.name.trim(), type: data.type || "Other", date: data.date?.trim() || "TBD", code: json.code || "" });
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Couldn't send right now. Try again, or DM us on Instagram @tekkrew_.");
    }
  }

  function reset() {
    formRef.current?.reset();
    setStatus("idle");
    setError("");
  }

  return (
    <form
      ref={formRef}
      className="tk-ticket"
      data-state={status}
      onSubmit={onSubmit}
      onInput={() => error && status !== "error" && setError("")}
      noValidate
      aria-label="Book TekKREW"
    >
      <div className="tk-ticket__main">
        <div className="tk-ticket__eyebrow">
          <span>TekKREW · <b>Booking pass</b></span>
          <span>HTX • DTX</span>
        </div>
        <h3 className="tk-ticket__title">Book the <em>krew</em></h3>

        <div className="tk-ticket__row">
          <label className="tk-tfield">
            <span>Your name</span>
            <input name="name" autoComplete="name" placeholder="Jordan Reyes" enterKeyHint="next" maxLength={80} required />
          </label>
          <label className="tk-tfield">
            <span>Reach you at</span>
            <input name="contact" autoComplete="email" inputMode="email" placeholder="Phone, email or @IG" enterKeyHint="next" maxLength={120} required />
          </label>
        </div>

        <div className="tk-ticket__chips" role="radiogroup" aria-label="What is it for">
          {TYPES.map((t, i) => (
            <label key={t} className="tk-tchip">
              <input type="radio" name="type" value={t} defaultChecked={i === 0} />
              {t}
            </label>
          ))}
        </div>

        <div className="tk-ticket__row">
          <label className="tk-tfield">
            <span>Date</span>
            <input name="date" placeholder="Nov 14" enterKeyHint="next" maxLength={60} />
          </label>
          <label className="tk-tfield">
            <span>Where</span>
            <input name="where" placeholder="Houston, TX" enterKeyHint="next" maxLength={80} />
          </label>
        </div>

        <label className="tk-tfield tk-tfield--wide">
          <span>Details</span>
          <textarea name="message" rows={4} placeholder="Tell us what you have in mind: the event, the vibe, how long" maxLength={2000} required />
        </label>

        {/* Spam trap: hidden from people, bots fill it in */}
        <input className="tk-ticket__hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="tk-ticket__foot">
          <span className="tk-ticket__fine"><i aria-hidden="true" />Goes straight to the krew</span>
          <button className="tk-ticket__btn" type="submit" disabled={status === "sending" || status === "sent"}>
            <span className="tk-lbl tk-lbl--idle">
              Send it
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </span>
            <span className="tk-lbl tk-lbl--sending" aria-hidden={status !== "sending"}>
              <i className="tk-spin" />
              Sending
            </span>
          </button>
        </div>
        <p className="tk-ticket__err" role="alert">{error}</p>
      </div>

      <div className="tk-ticket__stub">
        <small aria-hidden="true">ADMIT ONE</small>
        <span className="tk-ticket__stub-name" aria-hidden="true">TekKREW</span>
        <span className="tk-barcode" aria-hidden="true" />
        <a
          className="tk-ig"
          href="https://www.instagram.com/tekkrew_/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TekKREW on Instagram"
          title="@tekkrew_"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>

      {/* Confirmation pass. Always rendered so it can animate in (a freshly mounted element has nothing to transition from). */}
      <div className="tk-confirm" role="status" aria-live="polite" aria-hidden={status !== "sent"}>
        <div className="tk-confirm__head">
          <span className="tk-confirm__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h4>Booked</h4>
        </div>
        <p className="tk-confirm__msg">Got it. The krew will hit you back soon.</p>
        <div className="tk-confirm__receipt">
          <div><small>Name</small><b>{booked.name}</b></div>
          <div><small>For</small><b>{booked.type}</b></div>
          <div><small>Date</small><b>{booked.date}</b></div>
        </div>
        <div className="tk-confirm__foot">
          <code>{booked.code}</code>
          <button type="button" className="tk-ticket__again" onClick={reset} tabIndex={status === "sent" ? 0 : -1}>
            Send another
          </button>
        </div>
      </div>
    </form>
  );
}
