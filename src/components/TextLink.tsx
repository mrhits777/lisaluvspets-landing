"use client";

import { SITE } from "@/lib/site";
import { trackTextClick } from "@/lib/track";

/**
 * An sms: link to Lisa's REAL number — never the Google forwarding number, which cannot
 * receive texts. Fires the separate "Text Click" conversion so text leads are visible
 * without inflating the verified form/call numbers.
 */
export default function TextLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={SITE.smsHref} className={className} onClick={() => trackTextClick()}>
      {children}
    </a>
  );
}
