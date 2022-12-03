/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-nunito)", ...fontFamily.sans],
    },
    extend: {
      colors: {
        brand: {
          text: "#344979",
          brown: "#784940",
          primary: "#4168C4",
          green: {
            dark: "#5A7828",
            light: "#97C44B",
          },
        },
      },
    },
    plugins: [],
  },
};
