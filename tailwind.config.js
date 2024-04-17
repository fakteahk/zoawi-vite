/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'atkinson': ['"Atkinson Hyperlegible"', 'sans-serif'],
        'alegreya': ["Alegreya", 'sans-serif']
      }
    },
  },
  plugins: [],
}