import type { Config } from "tailwindcss";

const fontFamily = [
  "var(--text-font)",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Noto Sans",
  "sans-serif",
];

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          light: "#ffe8e6",
          dark: "#ed422b",
        },
        primary: {
          dark: "#0E2B2F",
          light: "#97C44B",
        },
        brand: {
          text: "#566A6D",
          brown: "#784940",
          primary: "#4168C4",
          accent: "#D89365",
          green: {
            dark: "#0E2B2F",
            light: "#97C44B",
          },
        },
      },
      fontFamily: {
        sans: fontFamily,
        body: fontFamily,
        heading: fontFamily,
      },
    },
  },
  plugins: [],
};
export default config;
