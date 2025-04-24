/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montreal: ['"Neue Montreal"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },},
  plugins: [],
}