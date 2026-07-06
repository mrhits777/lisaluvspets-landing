import { SITE, type Variant } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import TrackedLink from "@/components/TrackedLink";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-stone-700 ring-1 ring-stone-200">
      {children}
    </span>
  );
}

export default function LandingPage({ v }: { v: Variant }) {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#fffaf3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-bold text-stone-900">{SITE.business}</span>
          </div>
          <TrackedLink
            href={SITE.phoneHref}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
          >
            Call {SITE.phone}
          </TrackedLink>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-[#fffaf3]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Chip>⭐ 5-star local care</Chip>
              <Chip>🛡️ Insured & background-checked</Chip>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">{v.h1}</h1>
            <p className="mt-4 text-lg text-stone-600">{v.sub}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {v.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-stone-700">
                  <span className="mt-0.5 text-amber-600">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={SITE.phoneHref}
                className="rounded-xl bg-amber-500 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-amber-600"
              >
                📞 Call {SITE.phone}
              </TrackedLink>
              <a
                href="#book"
                className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-center font-semibold text-stone-800 transition hover:bg-stone-50"
              >
                Book a free meet &amp; greet
              </a>
            </div>
            <p className="mt-3 text-sm text-stone-500">Serving {SITE.cities.join(" · ")}</p>
          </div>

          {/* Form card */}
          <div id="book" className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8">
            <h2 className="text-xl font-bold text-stone-900">Book a free meet &amp; greet</h2>
            <p className="mt-1 text-sm text-stone-600">Tell us a bit about your pet — we&apos;ll reach out fast.</p>
            <div className="mt-5">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">{s.title}</h3>
              <p className="mt-2 text-stone-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Lisa (founder trust) */}
      <section className="bg-amber-50/60">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <p className="text-2xl">👋🐕</p>
          <h2 className="mt-3 text-3xl font-bold text-stone-900">Hi, I&apos;m Lisa</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            I&apos;ve cared for Peninsula pets for years, and I treat every dog and cat like my own.
            You&apos;ll get a real person, real updates after every visit, and total peace of mind that
            your best friend is safe, happy, and loved while you&apos;re away.
          </p>
          <p className="mt-4 font-semibold text-stone-800">Fast replies · usually within the hour</p>
        </div>
      </section>

      {/* Testimonials — REPLACE with Lisa's real reviews before scaling spend */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold text-stone-900">What pet parents say</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            ["“Lisa is the only person I trust with Bella. The photo updates make my day.”", "— Sarah M., Belmont"],
            ["“Reliable, kind, and my cats actually like her. Booking was so easy.”", "— David R., San Carlos"],
            ["“Same-week start and my dog comes back happy and tired. Highly recommend.”", "— Priya N., Redwood City"],
          ].map(([quote, who]) => (
            <figure key={who} className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="text-amber-500">★★★★★</div>
              <blockquote className="mt-3 text-stone-700">{quote}</blockquote>
              <figcaption className="mt-3 text-sm font-medium text-stone-500">{who}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-stone-400">
          Placeholder reviews — swap in Lisa&apos;s real testimonials before scaling ad spend.
        </p>
      </section>

      {/* Final CTA */}
      <section className="bg-stone-900">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to book {v.service} in {SITE.area.split(" & ")[0]}?</h2>
          <p className="mt-3 text-stone-300">Call now or request your free meet &amp; greet — no obligation.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedLink href={SITE.phoneHref} className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600">
              📞 Call {SITE.phone}
            </TrackedLink>
            <TrackedLink href={SITE.emailHref} className="rounded-xl border border-stone-600 px-6 py-3 font-semibold text-white transition hover:bg-stone-800">
              ✉️ Email us
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-[#fffaf3]">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-stone-600">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <span className="font-semibold text-stone-800">🐾 {SITE.business}</span>
            <span>
              <TrackedLink href={SITE.phoneHref} className="hover:underline">{SITE.phone}</TrackedLink>
              {" · "}
              <TrackedLink href={SITE.emailHref} className="hover:underline">{SITE.email}</TrackedLink>
            </span>
          </div>
          <p className="mt-2 text-stone-500">Serving {SITE.cities.join(", ")} and nearby.</p>
        </div>
      </footer>
    </>
  );
}
