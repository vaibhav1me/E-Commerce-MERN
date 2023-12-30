/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f2330",
        secondary: "#244a60",
        tertiary: "#a2b8cd",
        yellow: "#ffff00"
      },
      screens: {
        large: "1200px",
        medium: "550px",
        small: "360px",
      }
    },
  },
  plugins: [],
}

