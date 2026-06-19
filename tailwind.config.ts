import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── CEO-MANDATED COLOUR PALETTE ──────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: "#00B98E",
          50:  "#E6FAF5",
          100: "#C3F3E6",
          200: "#8FEBD4",
          300: "#4FDCBC",
          400: "#1FC9A5",
          500: "#00B98E",   // brand primary
          600: "#009472",
          700: "#007459",
          800: "#005540",
          900: "#003829",
        },
        secondary: {
          DEFAULT: "#FF6922",
          50:  "#FFF0EA",
          100: "#FFDBC8",
          200: "#FFB78F",
          300: "#FF9158",
          400: "#FF7A36",
          500: "#FF6922",   // brand secondary
          600: "#E5521A",
          700: "#C24011",
          800: "#9A300C",
          900: "#6D2008",
        },
        brand: {
          light: "#EFFDF5",  // CEO's light bg
          dark:  "#0E2E50",  // CEO's dark navy
        },
      },
      // ── TYPOGRAPHY ───────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      // ── ANIMATIONS ───────────────────────────────────────────────────────
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        "count-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up":    "fade-in-up 0.6s ease-out forwards",
        "fade-in":       "fade-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right":"slide-in-right 0.6s ease-out forwards",
        float:           "float 4s ease-in-out infinite",
        shimmer:         "shimmer 3s linear infinite",
        "pulse-ring":    "pulse-ring 1.5s ease-out infinite",
        "count-up":      "count-up 0.4s ease-out forwards",
      },
      // ── SPACING / SIZES ─────────────────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      // ── BACKDROP ────────────────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },
      // ── BOX SHADOWS ─────────────────────────────────────────────────────
      boxShadow: {
        "glass": "0 8px 32px rgba(0,185,142,0.12), 0 0 0 1px rgba(0,185,142,0.08)",
        "glass-dark": "0 8px 32px rgba(14,46,80,0.24), 0 0 0 1px rgba(255,255,255,0.06)",
        "card":  "0 4px 24px rgba(14,46,80,0.08)",
        "card-hover": "0 16px 48px rgba(0,185,142,0.18)",
        "primary": "0 8px 24px rgba(0,185,142,0.32)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0,185,142,0.12) 0%, transparent 60%)",
        "mesh-primary": "radial-gradient(at 40% 20%, rgba(0,185,142,0.12) 0, transparent 50%), radial-gradient(at 80% 0%, rgba(255,105,34,0.06) 0, transparent 50%), radial-gradient(at 0% 50%, rgba(0,185,142,0.08) 0, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
