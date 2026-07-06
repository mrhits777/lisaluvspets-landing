import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { CITIES, cityVariant } from "@/lib/site";

export const dynamicParams = false; // only the listed cities exist; others 404

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const v = cityVariant("dog-walking", city);
  return v ? { title: v.metaTitle, description: v.metaDescription } : {};
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const v = cityVariant("dog-walking", city);
  if (!v) notFound();
  return <LandingPage v={v} />;
}
