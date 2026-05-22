import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${instrumentSerif.variable} font-body antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}