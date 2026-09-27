import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-display" });
const accent = Instrument_Serif({ weight: ["400"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-accent" });
const body = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.excellentdrysystem.com"),
  title: {
    default: "Excellent Dry System | Clothes Drying Stand Manufacturer in Pune",
    template: "%s | Excellent Dry System Pune",
  },
  description:
    "Manufacturer of pulley-operated clothes drying systems in Pune: open terrace, ceiling mount and wall mount stands. 1,00,000+ installations, same-week fitting, 304-grade steel.",
  keywords: [
    "clothes drying stand", "cloth drying rack", "wall mounted clothes drying rack",
    "pulley operated cloth drying system", "ceiling mount clothes dryer", "clothes drying stand manufacturer pune",
  ],
  openGraph: { type: "website", siteName: "Excellent Dry System" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Excellent Dry System",
    telephone: "+91-9226848274",
    email: "excellentdry@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jai Ganesh Vision, D-Wing Shop 15, Akurdi",
      addressLocality: "Pune",
      postalCode: "411035",
      addressCountry: "IN",
    },
    priceRange: "₹₹",
  };
  return (
    <html lang="en" className={`${display.variable} ${accent.variable}`}>
      <body className={body.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
