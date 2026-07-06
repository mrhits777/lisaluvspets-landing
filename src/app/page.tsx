import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="text-5xl">🐾</div>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-stone-900">{SITE.business}</h1>
      <p className="mt-3 text-lg text-stone-600">
        Insured dog walking &amp; in-home pet care in {SITE.area}.
      </p>
      <div className="mt-8 grid w-full gap-4 sm:grid-cols-2">
        <Link
          href="/dog-walking/belmont"
          className="rounded-2xl border border-stone-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
        >
          <div className="text-2xl">🐕</div>
          <h2 className="mt-2 font-bold text-stone-900">Dog Walking</h2>
          <p className="mt-1 text-sm text-stone-600">Daily walks &amp; mid-day visits with photo updates.</p>
        </Link>
        <Link
          href="/pet-sitting/belmont"
          className="rounded-2xl border border-stone-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
        >
          <div className="text-2xl">🏡</div>
          <h2 className="mt-2 font-bold text-stone-900">In-Home Pet Sitting</h2>
          <p className="mt-1 text-sm text-stone-600">Loving drop-in visits &amp; check-ups while you&apos;re away.</p>
        </Link>
      </div>
      <TrackedLink
        href={SITE.phoneHref}
        className="mt-8 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
      >
        📞 Call {SITE.phone}
      </TrackedLink>
    </main>
  );
}
