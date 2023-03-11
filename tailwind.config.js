/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.njk", "./src/**/*.html", "./src/**/*.md", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        // sofia: ["Sofia Sans", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "375px",
      },
      colors: {
        pwblue: "#2480E6",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
