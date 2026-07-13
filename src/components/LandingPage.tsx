import Image from "next/image";
import { SITE, type Variant } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import CallLink from "@/components/CallLink";
import TextLink from "@/components/TextLink";
import TrackedLink from "@/components/TrackedLink";

const REVIEWS: [string, string][] = [
  ["“My dog can sometimes be nervous meeting new people, but she went right up to Lisa at our meet & greet. Lisa was great!!”", "Caroline C. · Cassie · via Rover"],
  ["“Finding Lisa was a blessing! Our anxious rescue dog Bella is usually terrified of strangers, but she warmed up to Lisa immediately.”", "Jennifer T. · Bella · via Rover"],
  ["“Lisa was great! She communicated frequently, sent photos, and my pupper loved her!”", "Karina W. · Indy · via Rover"],
];

function TrustStrip({ dark = false }: { dark?: boolean }) {
  const items = ["5-star on Rover", "A real person, not an app", "Photo after every visit", "Free meet & greet"];
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${dark ? "text-white/90" : "text-stone-600"}`}>
      {items.map((i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-amber-500">✓</span>
          {i}
        </span>
      ))}
    </div>
  );
}

function PhoneCTA({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex shrink-0 flex-col items-center gap-2 ${className}`}>
      <CallLink className="w-full whitespace-nowrap rounded-xl bg-emerald-600 px-6 py-3.5 text-center font-bold text-white shadow-sm transition hover:bg-emerald-700">
        📞 Call Lisa Now
      </CallLink>
      <TextLink
        className={`whitespace-nowrap text-sm font-semibold underline ${dark ? "text-white/90 hover:text-white" : "text-stone-600 hover:text-stone-900"}`}
      >
        💬 Or text {SITE.phone}
      </TextLink>
    </div>
  );
}

export default function LandingPage({ v }: { v: Variant }) {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-[#fffaf3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-bold text-stone-900">{SITE.business}</span>
          </div>
          <CallLink className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
            📞 Call Lisa Now
          </CallLink>
        </div>
      </header>

      {/* Hero — headline + form together, above the fold */}
      <section className="relative isolate">
        <Image src={v.heroImage} alt={`${v.h1} — happy, well-cared-for pets`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-16">
          {/* Left: pitch */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl">{v.h1}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">{v.sub}</p>
            <div className="mt-5">
              <TrustStrip dark />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PhoneCTA dark />
              <p className="text-sm text-white/80">One local walker — I keep a small route so every walk stays unrushed.</p>
            </div>
            <p className="mt-4 text-sm text-white/80">Serving {SITE.cities.join(" · ")}</p>
          </div>

          {/* Right: the form, visible on load */}
          <div id="book" className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-7">
            <div className="flex items-center gap-3">
              <Image src="/lisa.webp" alt="Lisa" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-200" />
              <div>
                <h2 className="text-lg font-bold text-stone-900">Get your free meet &amp; greet</h2>
                <p className="text-xs text-stone-500">with Lisa — no obligation</p>
              </div>
            </div>
            <div className="mt-4">
              <LeadForm variant={v.slug} service={v.service} />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold text-stone-900">How it works</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {v.steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">{i + 1}</div>
              <h3 className="mt-4 font-semibold text-stone-900">{s.title}</h3>
              <p className="mt-2 text-stone-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Lisa — real photo */}
      <section className="bg-amber-50/60">
        <div className="mx-auto grid max-w-4xl items-center gap-8 px-4 py-14 sm:grid-cols-[200px_1fr]">
          <Image src="/lisa.webp" alt="Lisa, your local pet caregiver" width={200} height={200} className="mx-auto h-44 w-44 rounded-2xl object-cover shadow-md sm:h-48 sm:w-48" />
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Hi, I&apos;m Lisa 👋</h2>
            <p className="mt-3 text-lg text-stone-600">
              I&apos;ve cared for Peninsula pets for years, and I treat every dog and cat like my own. You get a real
              person — the same friendly face every visit, a photo after every walk, my own cell number, and total
              peace of mind that your best friend is safe, happy, and loved.
            </p>
            <p className="mt-3 font-semibold text-stone-800">Call or text me — I usually reply within the hour.</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold text-stone-900">What pet parents say</h2>
        <p className="mt-1 text-center text-amber-500">★★★★★ <span className="text-sm text-stone-500">real reviews from Lisa&apos;s clients</span></p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {REVIEWS.map(([quote, who]) => (
            <figure key={who} className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="text-amber-500">★★★★★</div>
              <blockquote className="mt-3 text-stone-700">{quote}</blockquote>
              <figcaption className="mt-3 text-sm font-medium text-stone-500">— {who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-stone-900">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to book {v.service} in {SITE.cities[0]}?</h2>
          <p className="mt-3 text-stone-300">No obligation — start with a free meet &amp; greet.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#book" className="rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-white transition hover:bg-amber-600">
              Get My Free Meet &amp; Greet
            </a>
            <PhoneCTA dark />
          </div>
          <p className="mt-4 text-sm text-stone-400">
            Prefer email? <a href={SITE.emailHref} className="underline">{SITE.email}</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-[#fffaf3]">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-stone-600">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <span className="font-semibold text-stone-800">🐾 {SITE.business}</span>
            <span>
              <a href={SITE.phoneHref} className="hover:underline">{SITE.phone}</a>
              {" · "}
              <TrackedLink href={SITE.emailHref} className="hover:underline">{SITE.email}</TrackedLink>
            </span>
          </div>
          <p className="mt-2 text-stone-500">Serving {SITE.cities.join(", ")} and nearby.</p>
        </div>
      </footer>

      {/* Sticky mobile call/text bar — always one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-black/10 sm:hidden">
        <CallLink className="bg-emerald-600 py-3.5 text-center font-bold text-white">📞 Call</CallLink>
        <TextLink className="bg-emerald-700 py-3.5 text-center font-bold text-white">💬 Text</TextLink>
      </div>
      <div className="h-14 sm:hidden" />
    </>
  );
}
