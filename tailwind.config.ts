import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ethere: {
          obsidian: "#050505",
          gold: "#D4AF37",
          accent: "#1A1A1A"
        },
        latelier: {
          sand: "#F2F0EB",
          charcoal: "#1A1A1A",
          silk: "#FFFFFF"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      letterSpacing: {
        luxury: "0.2em",
        editorial: "0.05em"
      },
      boxShadow: {
        luxe: "0 10px 40px rgba(0, 0, 0, 0.08)"
      },
      backgroundImage: {
        "luxe-cta": "linear-gradient(90deg, #2d2b27 0%, #1a1a1a 45%, #2d2b27 100%)",
        "gold-cta": "linear-gradient(90deg, #b89335 0%, #d4af37 50%, #b89335 100%)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;