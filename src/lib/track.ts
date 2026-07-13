import { CONVERSION, TEXT_CONVERSION } from "./site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function fire(sendTo: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: sendTo });
  }
}

/** Fire the Google Ads "Website Lead" conversion (form submit, email click). */
export function trackLead() {
  fire(CONVERSION.sendTo);
}

/** Fire the "Text Click" conversion. Separate action — a tap is not a sent text. */
export function trackTextClick() {
  fire(TEXT_CONVERSION.sendTo);
}
