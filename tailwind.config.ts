import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta de marca Fastpapers — ver PROMPT del proyecto.
        "amarillo-fast": "#FFC20E",
        "ambar-profundo": "#C98A00",
        "negro-papel": "#0E0E0E",
        grafito: "#1C1C1C",
        "blanco-hueso": "#F7F5F0",
        "verde-whatsapp": "#25D366",
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "Arial Black", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
      fontSize: {
        // Escala pensada para cifras/calibres grandes tipo señalética
        "display-xl": ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "0.98" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.02" }],
      },
      backgroundImage: {
        "grid-tecnica":
          "linear-gradient(rgba(255,194,14,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,194,14,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "24px 24px",
        "grid-lg": "64px 64px",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
      keyframes: {
        resaltar: {
          "0%": { backgroundSize: "0% 100%" },
          "100%": { backgroundSize: "100% 100%" },
        },
        "marcador-flotante": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        resaltar: "resaltar 220ms ease-out forwards",
        flotar: "marcador-flotante 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
