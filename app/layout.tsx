import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";

// --- Fonts ---
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Condensed athletic display face for headlines (scoreboard / kit lettering feel)
const displayFace = localFont({
  src: "./fonts/BigShouldersDisplay-Variable.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});

// --- Metadata & Favicon ---
const SITE_URL = "https://tekkrew.com";
const SITE_TITLE = "TekKREW | HTX • DTX";
const SITE_DESCRIPTION =
  "Freestyle//Panna KREW based in HTX • DTX. TekKREW is a freestyle football and panna crew from Houston, Texas: meet the crew, press features and gallery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "TekKREW",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "TekKREW",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TekKREW logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

// Structured data so Google can show the TekKREW name + logo in results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "TekKREW",
      url: SITE_URL,
      logo: `${SITE_URL}/tekkrew-logo-square.png`,
      image: `${SITE_URL}/og-image.jpg`,
      sameAs: ["https://www.instagram.com/tekkrew_/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "TekKREW",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", GeistSans.variable)}>
      <body className={`${inter.variable} ${displayFace.variable} font-body antialiased bg-[#050505] text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}