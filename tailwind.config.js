/** @type {import('tailwindcss').Config} */
const twTypography = import("@tailwindcss/typography");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
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
    plugins: [twTypography],
  },
};
