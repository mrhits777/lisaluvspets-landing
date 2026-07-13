import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { CALL_CONVERSION, CONVERSION, SITE } from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lisa Luvs Pets — Trusted Pet Care on the Peninsula",
  description: "Local dog walking and in-home pet care in Belmont & the Peninsula.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">
        {/* Google tag (gtag.js) — Lisa Luvs Pets · AW-1071985499 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${CONVERSION.awId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${CONVERSION.awId}');
gtag('config', '${CALL_CONVERSION.sendTo}', {
  'phone_conversion_number': '${SITE.phone}',
  'phone_conversion_css_class': '${CALL_CONVERSION.cssClass}'
});`}
        </Script>
        {children}
      </body>
    </html>
  );
}
