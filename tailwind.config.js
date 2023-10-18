/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
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
        sans: ["var(--text-font)", ...fontFamily.sans],
        body: ["var(--text-font)", ...fontFamily.sans],
        heading: ["var(--text-font)", ...fontFamily.sans],
      },
    },
    plugins: [],
  },
};
