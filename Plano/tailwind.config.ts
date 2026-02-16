import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema Éthéré
        ethere: {
          obsidian: "#050505",
          gold: "#D4AF37",
          accent: "#1A1A1A",
        },
        // Tema L'Atelier
        latelier: {
          sand: "#F2F0EB",
          charcoal: "#1A1A1A",
          silk: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"], // Cormorant ou Didot
        sans: ["var(--font-sans)", "sans-serif"], // Inter ou Montserrat
      },
      letterSpacing: {
        luxury: "0.2em",
        editorial: "0.05em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;