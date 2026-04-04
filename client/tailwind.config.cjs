/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bunna: {
          dark: "#3d1209",
          deep: "#2d0d07",
          mid:  "#5a1b0e",
        },
      },
    },
  },
  plugins: [],
};
