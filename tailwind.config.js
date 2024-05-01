/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fff",
        blue: "#0A66C2",
        black: "#1D2329",
        pale: "#F8EEFF",
        gray: "#9E9E9F",
        purple: "#9747FF",
        yellow: "#FED634",
        lightGray: "#FAFAFA",
        borderColor: "#e4dfdf",
        orange: "#F8A01D"
      },
      fontFamily: {
        graphik: ['Graphik', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}