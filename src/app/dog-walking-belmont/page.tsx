import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { VARIANTS } from "@/lib/site";

const v = VARIANTS["dog-walking-belmont"];

export const metadata: Metadata = { title: v.metaTitle, description: v.metaDescription };

export default function Page() {
  return <LandingPage v={v} />;
}
