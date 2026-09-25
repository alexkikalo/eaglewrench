"use client";

import { FormEvent, useState } from "react";

const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!email) return;

    if (!formId) {
      setStatus("err");
      setMessage(
        "Waitlist endpoint is not wired yet. Set NEXT_PUBLIC_FORMSPREE_ID when you have a Formspree form.",
      );
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "eaglewrench.com" }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("ok");
      setMessage("You’re on the list. We’ll only write when the next bay is ready.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Could not reach the waitlist service. Try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
      <label className="sr-only" htmlFor="waitlist-email">
        Email
      </label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        required
        placeholder="shop-email@example.com"
        className="flex-1 bg-garage-950 border border-white/15 px-4 py-3 text-base outline-none focus:border-garage-amber"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-6 py-3 bg-garage-amber text-garage-950 font-stencil tracking-[0.2em] text-xl hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "SENDING" : "GET ON THE LIST"}
      </button>
      {message ? (
        <p
          className={`sm:absolute sm:mt-16 text-sm ${status === "ok" ? "text-garage-amber" : "text-safety"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
