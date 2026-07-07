"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/site";

// Web3Forms access key is public by design (client-side form). Env var overrides if set.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "a81038ac-4f88-4b57-8b2b-1f58afa722a4";

export default function LeadForm({ variant, service }: { variant: string; service: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [tracking, setTracking] = useState({ gclid: "", utm_source: "", utm_medium: "", utm_campaign: "" });

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
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
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
      }
      router.push(`/thank-you?service=${encodeURIComponent(service)}`);
    } catch {
      setStatus("error");
    }
  }

  const input =
    "mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-stone-700">Your name</label>
        <input name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Mobile number</label>
        <input name="phone" type="tel" required autoComplete="tel" placeholder="(650) 000-0000" className={input} />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Tell Lisa about your pet (optional)</label>
        <textarea name="pet" rows={2} className={input} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-amber-500 px-4 py-3.5 text-center text-base font-bold text-white shadow-sm transition hover:bg-amber-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get My Free Meet & Greet"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong — please call or text{" "}
          <a href={SITE.phoneHref} className="font-semibold underline">{SITE.phone}</a>.
        </p>
      )}
      <p className="text-center text-xs text-stone-500">No obligation — Lisa calls or texts you back within the hour.</p>
    </form>
  );
}
