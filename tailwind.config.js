/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: "class",
    content: ["./src/**/*.njk", "./src/**/*.html", "./src/**/*.md", "./*.js"],
    theme: {
        extend: {
            fontFamily: {
                // sofia: ["Sofia Sans", ...defaultTheme.fontFamily.sans],
                sofiacondensed: [
                    "Sofia Sans Condensed",
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            screens: {
                xs: "375px",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
