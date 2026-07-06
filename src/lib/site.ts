// Central config for Lisa Luvs Pets landing pages.

export const SITE = {
  business: "Lisa Luvs Pets",
  tagline: "Trusted pet care on the Peninsula",
  phone: "(650) 245-1496",
  phoneHref: "tel:+16502451496",
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

export type Variant = {
  slug: string;
  heroImage: string;
  h1: string; // MUST match the ad headline / keyword word-for-word (Quality Score)
  sub: string;
  service: string; // short noun for copy, e.g. "dog walking"
  bullets: string[];
  steps: { title: string; body: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const VARIANTS: Record<string, Variant> = {
  "dog-walking-belmont": {
    slug: "dog-walking-belmont",
    heroImage: "/hero-dog-walking.jpg",
    h1: "Dog Walking in Belmont",
    sub: "Reliable, insured dog walkers for busy Peninsula families. Daily walks, mid-day visits, and lots of tail wags — booked in minutes.",
    service: "dog walking",
    bullets: [
      "Insured & background-checked",
      "Same-week start available",
      "GPS-tracked walks + photo updates",
      "Local to Belmont & the Peninsula",
    ],
    steps: [
      { title: "Book a free meet & greet", body: "We come meet you and your pup — no obligation, no pressure." },
      { title: "Set your walk schedule", body: "Daily, a few times a week, or one-off. You're always in control." },
      { title: "Relax — we've got the leash", body: "Every walk ends with a photo update and a happy, tired dog." },
    ],
    metaTitle: "Dog Walking in Belmont, CA | Lisa Luvs Pets",
    metaDescription: "Insured, local dog walkers in Belmont & the Peninsula. Daily walks and mid-day visits with photo updates. Call (650) 245-1496 for a free meet & greet.",
  },
  "pet-sitting-belmont": {
    slug: "pet-sitting-belmont",
    heroImage: "/hero-pet-sitting.jpg",
    h1: "In-Home Pet Sitting in Belmont",
    sub: "Loving in-home visits and check-ups so your pets stay comfy in their own space while you're away. Dogs, cats, and everything in between.",
    service: "in-home pet care",
    bullets: [
      "In-home visits — no kennels",
      "Feeding, meds, litter & playtime",
      "Daily photo & text updates",
      "Insured & background-checked",
    ],
    steps: [
      { title: "Book a free meet & greet", body: "We learn your pet's routine, feeding, and quirks up front." },
      { title: "Pick your visit schedule", body: "Drop-in visits, daily check-ups, or overnight care." },
      { title: "Travel with peace of mind", body: "You get updates after every visit — your pet never feels alone." },
    ],
    metaTitle: "In-Home Pet Sitting in Belmont, CA | Lisa Luvs Pets",
    metaDescription: "Insured in-home pet sitting & check-ups in Belmont & the Peninsula. Feeding, meds, and playtime with photo updates. Call (650) 245-1496 for a free meet & greet.",
  },
};
