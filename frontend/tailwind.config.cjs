/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "urban-regular": ["urban-regular", "sans-serif"],
      "urban-medium": ["urban-medium", "sans-serif"],
      "urban-semibold": ["urban-semibold", "sans-serif"],
      "urban-bold": ["urban-bold", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(180deg, #547AFF 0%, #1337F2 92.45%, #2400FF 100%)",
        "hero-pattern": "url('/login-hero.png')",
        "hero-mobile": "url('/login-hero-mobile.png')",
      },
      boxShadow: {
        custom: "box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.1);",
      },
      colors: {
        primary: "#FFBB54",
        primaryHover: "#ffb039",
        secondary: {
          green: "#25C78B",
          blue: "#04A4F4",
          red: "#DB5962",
        },
        neutral: {
          black: "#141522",
          darkGrey: "#9C9CA4",
          grey: "#DFDFDF",
          softGrey: "#F5F5F7",
        },
        label: {
          blue: "#EAF8FF",
          green: "#EFF6E9",
          yellow: "#FFF3E0",
          lightYellow: "#FFF4F3",
        },
        transparent: {
          default: "rgba(0, 0, 0, 0.3)",
          lightDark: "rgba(0, 0, 0, 0.2)",
          veryLightDark: "rgba(0, 0, 0, 0.1)",
        },
        white: "#ffffff",
      },
    },
  },
  plugins: [],
});
