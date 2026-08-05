// Central config for Lisa Luvs Pets landing pages.

export const SITE = {
  business: "Lisa Luvs Pets",
  tagline: "Trusted pet care on the Peninsula",
  phone: "(650) 245-1496",
  phoneHref: "tel:+16502451496",
  smsHref: "sms:+16502451496",
  email: "koharalisa@gmail.com",
  emailHref: "mailto:koharalisa@gmail.com",
  area: "Belmont & the Peninsula",
  // The service area shown to visitors. MUST cover every city we run ads to, or a visitor
  // lands on /dog-walking/burlingame and reads a service-area list that excludes Burlingame.
  // Keep in sync with `cities` in clients/lisa-luvs-pets/client.json (the ad-side source of
  // truth). Woodside / Atherton / Half Moon Bay are deliberately absent — Lisa confirmed
  // 2026-07-31 she does not service them, and their ad groups are paused.
  cities: [
    "Belmont", "San Carlos", "San Mateo", "Redwood City", "Menlo Park",
    "Foster City", "Burlingame", "Millbrae", "Hillsborough",
  ],
} as const;

// Google Ads conversion action "Lisa Luvs Pets - Website Lead" (created via API).
export const CONVERSION = {
  awId: "AW-1071985499",
  sendTo: "AW-1071985499/oCu1CMO-38scENvmlP8D",
} as const;

// Conversion action "Lisa Luvs Pets - Call From Website" (WEBSITE_CALL).
// gtag swaps SITE.phone for a Google forwarding number for visitors who arrived from an
// ad, so a real call gets attributed to the keyword. Only calls >= 30s count. Everyone
// else still sees the real number. `cssClass` marks the call buttons that show no number.
export const CALL_CONVERSION = {
  sendTo: "AW-1071985499/xU8zCKLJ488cENvmlP8D",
  cssClass: "gads-call",
} as const;

// Conversion action "Lisa Luvs Pets - Text Click". Lisa takes text leads, but nothing can
// confirm a text was actually sent — tapping the sms: link is the only signal there is. So
// this is a click proxy, kept separate from the (verified) form and call conversions.
export const TEXT_CONVERSION = {
  sendTo: "AW-1071985499/P3nTCPGk5M8cENvmlP8D",
} as const;

// The Peninsula cities we serve (City x Service matrix). slug drives the dynamic route.
export const CITIES = [
  { name: "Belmont", slug: "belmont" },
  { name: "San Carlos", slug: "san-carlos" },
  { name: "San Mateo", slug: "san-mateo" },
  { name: "Redwood City", slug: "redwood-city" },
  { name: "Menlo Park", slug: "menlo-park" },
  { name: "Foster City", slug: "foster-city" },
  { name: "Burlingame", slug: "burlingame" },
  { name: "Millbrae", slug: "millbrae" },
  { name: "Hillsborough", slug: "hillsborough" },
  { name: "Woodside", slug: "woodside" },
  { name: "Atherton", slug: "atherton" },
  { name: "Half Moon Bay", slug: "half-moon-bay" },
] as const;

export type Variant = {
  slug: string;
  heroImage: string;
  h1: string;
  sub: string;
  city: string;
  service: string;
  pitchLine: string;
  bullets: string[];
  steps: { title: string; body: string }[];
  metaTitle: string;
  metaDescription: string;
};

type ServiceTemplate = {
  label: string;
  service: string;
  hero: string;
  sub: (city: string) => string;
  pitchLine: string;
  bullets: string[];
  steps: { title: string; body: string }[];
};

export const SERVICES: Record<string, ServiceTemplate> = {
  "dog-walking": {
    label: "Dog Walking",
    service: "dog walking",
    hero: "/hero-dog-walking.jpg",
    sub: (city) =>
      `A real, local dog walker — not a rotating app. The same friendly face every walk, a photo after each one, and my own cell number. Now serving ${city}.`,
    pitchLine: "One local walker — I keep a small route so every walk stays unrushed.",
    bullets: [
      "Trusted, one-on-one care",
      "Same-week start available",
      "GPS-tracked walks + photo updates",
      "Local to the Peninsula",
    ],
    steps: [
      { title: "Book a free meet & greet", body: "We come meet you and your pup — no obligation, no pressure." },
      { title: "Set your walk schedule", body: "Daily, a few times a week, or one-off. You're always in control." },
      { title: "Relax — we've got the leash", body: "Every walk ends with a photo update and a happy, tired dog." },
    ],
  },
  "pet-sitting": {
    label: "In-Home Pet Sitting",
    service: "in-home pet care",
    hero: "/hero-pet-sitting.jpg",
    sub: (city) =>
      `A real, local pet sitter — not an app. Your pet stays home on their own routine, with a photo after every visit and my own cell number. Now serving ${city}.`,
    pitchLine: "One local sitter — I keep a small client list so every visit stays unrushed.",
    bullets: [
      "In-home visits — no kennels",
      "Feeding, meds, litter & playtime",
      "Daily photo & text updates",
      "Trusted, one-on-one care",
    ],
    steps: [
      { title: "Book a free meet & greet", body: "We learn your pet's routine, feeding, and quirks up front." },
      { title: "Pick your visit schedule", body: "Drop-in visits, daily check-ups, or overnight care." },
      { title: "Travel with peace of mind", body: "You get updates after every visit — your pet never feels alone." },
    ],
  },
};

/** Build a keyword-matched landing-page variant for a given service + city slug. */
export function cityVariant(serviceKey: string, citySlug: string): Variant | null {
  const t = SERVICES[serviceKey];
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!t || !city) return null;
  return {
    slug: `${serviceKey}-${citySlug}`,
    heroImage: t.hero,
    h1: `${t.label} in ${city.name}`,
    sub: t.sub(city.name),
    city: city.name,
    service: t.service,
    pitchLine: t.pitchLine,
    bullets: t.bullets,
    steps: t.steps,
    metaTitle: `${t.label} in ${city.name}, CA | Lisa Luvs Pets`,
    metaDescription: `Trusted ${t.service} in ${city.name} & the Peninsula. Photo updates, free meet & greet. Call ${SITE.phone}.`,
  };
}
