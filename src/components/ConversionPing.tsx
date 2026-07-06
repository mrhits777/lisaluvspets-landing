"use client";

import { useEffect } from "react";
import { trackLead } from "@/lib/track";

/** Fires the Google Ads lead conversion once, on the thank-you page. */
export default function ConversionPing() {
  useEffect(() => {
    trackLead();
  }, []);
  return null;
}
