import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FDE68A",
          dark: "#A78BFA",
        },
        background: {
          light: "#F9FAFB",
          dark: "#0F0F1B",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1C1C2A",
        },
        text: {
          light: "#111827",
          dark: "#F3F4F6",
        },
        accent: {
          yellow: "#FFD95A",
          purple: "#C084FC",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05)",
        glow: "0 0 10px rgba(192, 132, 252, 0.6)",
      },
    },
  },

  plugins: [],
};

export default config;
