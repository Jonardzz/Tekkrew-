import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        stroke: "var(--stroke)",
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(90deg, #FFE600 0%, #FFB800 100%)",
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