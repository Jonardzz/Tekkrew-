import type { Config } from "tailwindcss";

const config: Config = {
  // hover: styles only apply on devices that can really hover (mouse/trackpad),
  // so they don't get stuck "on" after a tap on phones.
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom TekKREW variables
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        stroke: "var(--stroke)",
        
        // Shadcn required variables (mapped to your theme so it doesn't break)
        border: "var(--border, var(--stroke))",
        ring: "var(--ring, #FF4328)",
        background: "var(--background, #050505)",
        foreground: "var(--foreground, #ffffff)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(90deg, var(--accent) 0%, var(--accent) 100%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "scroll-dot": "slideDown 1.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;