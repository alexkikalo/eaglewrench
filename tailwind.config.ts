import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garage: {
          950: "#0b0c0e",
          900: "#121417",
          800: "#1a1d22",
          700: "#262b33",
          steel: "#8b929c",
          amber: "#d4a017",
          rust: "#c44b2b",
        },
        safety: "#e11d2e",
      },
      fontFamily: {
        stencil: ["var(--font-stencil)", "Impact", "Haettenschweiler", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        bay: "inset 0 0 80px rgba(0,0,0,0.55), 0 0 40px rgba(212,160,23,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
