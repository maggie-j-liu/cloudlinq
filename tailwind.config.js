const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        theme: {
          lighter: "var(--color-theme-lighter)",
          light: "var(--color-theme-light)",
          DEFAULT: "var(--color-theme-base)",
          dark: "var(--color-theme-dark)",
          darker: "var(--color-theme-darker)",
          bg: "var(--color-theme-bg)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
