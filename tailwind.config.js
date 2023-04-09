/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.njk",
    "./src/**/*.html",
    "./src/**/*.md",
    "./src/**/*.js",
  ],
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
        pwpink: "#e83561",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
