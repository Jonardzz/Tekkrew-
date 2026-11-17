import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";

// --- Fonts ---
// Two typefaces: Big Shoulders (headlines) + Geist (everything else).

// Condensed athletic display face for headlines (scoreboard / kit lettering feel)
const displayFace = localFont({
  src: "./fonts/BigShouldersDisplay-Variable.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});

// Brush face used across the whole site for now (free stand-in for RUSHK, the font of the yellow logo).
// To use the real RUSHK later: drop its .otf/.ttf into app/fonts and change `src` below.
const brushFace = localFont({
  src: "./fonts/CaveatBrush-Regular.ttf",
  weight: "400",
  variable: "--font-brush",
  display: "swap",
  // Brush letters are drawn small inside their box: 125% reads the same size the old fonts did (16px body).
  // 156% = that, 25% bigger again, so body text reads like 20px. Raise or lower this one number to resize all text.
  declarations: [{ prop: "size-adjust", value: "156%" }],
});

// --- Metadata & Favicon ---
const SITE_URL = "https://tekkrew.com";
const SITE_TITLE = "Tekkrew | HTX • DTX";
const SITE_DESCRIPTION =
  "Freestyle//Panna KREW based in HTX • DTX. Tekkrew is a freestyle football and panna crew from Houston, Texas: meet the crew, press features and gallery.";

// Phone status bar / browser chrome blends into the page background
export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Tekkrew",
  alternates: { canonical: "/" },
  // Versioned file names so browsers and Google fetch the new icon instead of a cached one.
  // Google wants a square icon of at least 48x48 px; this one is 512x512.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/tekkrew-icon-v3.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/tekkrew-icon-v3.png",
    apple: { url: "/tekkrew-apple-icon-v3.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tekkrew",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image-yellow.jpg", width: 1200, height: 630, alt: "Tekkrew logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image-yellow.jpg"],
  },
};

// Structured data so Google can show the Tekkrew name + logo in results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Tekkrew",
      url: SITE_URL,
      logo: `${SITE_URL}/tekkrew-logo-square-yellow.png`,
      image: `${SITE_URL}/og-image-yellow.jpg`,
      sameAs: ["https://www.instagram.com/tekkrew_/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Tekkrew",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image-yellow.jpg` },
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
      <body className={`${displayFace.variable} ${brushFace.variable} font-body antialiased bg-[#050505] text-white`}>
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