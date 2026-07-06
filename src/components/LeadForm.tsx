"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/site";

// Free lead delivery via Web3Forms (client-side, no backend). Get a key at
// https://web3forms.com (enter koharalisa@gmail.com) and set it in .env.local as
// NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY. Until then, the form still redirects/converts
// but the lead is NOT emailed — see the console warning.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function LeadForm({ variant, service }: { variant: string; service: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [tracking, setTracking] = useState({ gclid: "", utm_source: "", utm_medium: "", utm_campaign: "" });

  // Capture the Google click id + UTMs from the URL so leads are attributable.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setTracking({
      gclid: p.get("gclid") ?? "",
      utm_source: p.get("utm_source") ?? "",
      utm_medium: p.get("utm_medium") ?? "",
      utm_campaign: p.get("utm_campaign") ?? "",
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      subject: `New ${service} lead — ${SITE.business}`,
      from_name: SITE.business,
      landing_page: variant,
      ...data,
      ...tracking,
    };

    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...payload }),
        });
        if (!res.ok) throw new Error("submit failed");
      } else {
        console.warn("[LeadForm] No NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY set — lead NOT delivered:", payload);
      }
      router.push(`/thank-you?service=${encodeURIComponent(service)}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-stone-700">Your name</label>
        <input name="name" required autoComplete="name"
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-stone-700">Phone</label>
          <input name="phone" type="tel" required autoComplete="tel"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Email</label>
          <input name="email" type="email" required autoComplete="email"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Tell us about your pet (optional)</label>
        <textarea name="pet" rows={2}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
      </div>
      <button type="submit" disabled={status === "sending"}
        className="w-full rounded-lg bg-amber-500 px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-amber-600 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Get My Free Meet & Greet"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong — please call us at{" "}
          <a href={SITE.phoneHref} className="font-semibold underline">{SITE.phone}</a>.
        </p>
      )}
      <p className="text-center text-xs text-stone-500">No obligation. We usually reply within the hour.</p>
    </form>
  );
}
