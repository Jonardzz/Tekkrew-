import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
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
export const metadata: Metadata = {
  title: "TekKREW | Freestylers",
  description: "Freestyle//Panna KREW based in HTX•DTX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", GeistSans.variable)}>
      <body className={`${inter.variable} ${displayFace.variable} font-body antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}