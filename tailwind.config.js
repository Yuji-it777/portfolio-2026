/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./protfolio/index.html",
    "./protfolio/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
