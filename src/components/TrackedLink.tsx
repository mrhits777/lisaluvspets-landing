"use client";

import { trackLead } from "@/lib/track";

/** A tel:/mailto: link that fires the lead conversion on click. */
export default function TrackedLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => trackLead()}>
      {children}
    </a>
  );
}
