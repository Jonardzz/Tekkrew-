import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";

// --- Fonts ---
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

// --- Metadata & Favicon ---
export const metadata: Metadata = {
  title: "Tekkrew | Freestylers",
  description: "Road to World Cup '26 - Houston, Texas",
  icons: {
    icon: "/Tekkrew.jpg", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", GeistSans.variable)}>
      <body className={`${inter.variable} ${instrumentSerif.variable} font-body antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}