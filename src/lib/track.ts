import { CONVERSION } from "./site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire the Google Ads "Website Lead" conversion. Safe to call anywhere (no-op on server). */
export function trackLead() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: CONVERSION.sendTo });
  }
}
