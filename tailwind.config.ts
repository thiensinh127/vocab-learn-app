import type { Config } from "tailwindcss"

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
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1e40af",
        },
        background: {
          light: "#ffffff",
          dark: "#0f172a",
        },
        text: {
          light: "#1f2937",
          dark: "#f1f5f9",
        },
      },
    },
  },
  plugins: [],
}

export default config
