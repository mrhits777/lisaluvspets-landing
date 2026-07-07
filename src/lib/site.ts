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
  cities: ["Belmont", "San Carlos", "San Mateo", "Redwood City", "Menlo Park", "Foster City"],
} as const;

// Google Ads conversion action "Lisa Luvs Pets - Website Lead" (created via API).
export const CONVERSION = {
  awId: "AW-1071985499",
  sendTo: "AW-1071985499/oCu1CMO-38scENvmlP8D",
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
  service: string;
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
    service: t.service,
    bullets: t.bullets,
    steps: t.steps,
    metaTitle: `${t.label} in ${city.name}, CA | Lisa Luvs Pets`,
    metaDescription: `Trusted ${t.service} in ${city.name} & the Peninsula. Photo updates, free meet & greet. Call ${SITE.phone}.`,
  };
}
