import type { Metadata } from "next";
import Link from "next/link";
import ConversionPing from "@/components/ConversionPing";
import CallLink from "@/components/CallLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you — Lisa Luvs Pets",
  robots: { index: false, follow: false },
};

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      {/* Fires the Google Ads "Website Lead" conversion */}
      <ConversionPing />
      <div className="text-5xl">🐾</div>
      <h1 className="mt-4 text-3xl font-bold text-stone-900">Thank you! We got your request.</h1>
      <p className="mt-3 text-stone-600">
        Lisa will reach out shortly about your {service ?? "pet care"} — usually within the hour.
        Prefer to talk now?
      </p>
      <CallLink className="mt-6 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600">
        📞 Call Lisa Now
      </CallLink>
      <Link href="/" className="mt-4 text-sm text-stone-500 hover:underline">
        ← Back home
      </Link>
    </main>
  );
}
