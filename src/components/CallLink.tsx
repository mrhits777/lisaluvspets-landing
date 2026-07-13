import { CALL_CONVERSION, SITE } from "@/lib/site";

/**
 * A tel: link whose number gtag swaps for a Google forwarding number (ad visitors only),
 * so Google counts the actual connected call. Deliberately fires NO click event: a tap is
 * not a call, and counting taps inflates leads with desktop misclicks and hang-ups.
 *
 * MUST NOT render the phone number as text. Forwarding numbers cannot receive SMS, and
 * Lisa takes text leads — so a number a visitor could read and text must always be the
 * real one. Anything that displays the number stays un-swapped (no `gads-call` class).
 */
export default function CallLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={SITE.phoneHref}
      className={[CALL_CONVERSION.cssClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </a>
  );
}
