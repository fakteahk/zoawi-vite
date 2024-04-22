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
      },
      colors: {
        'background': "#f0e7e5",
        'primary': '#34503a', 
        'secondary': '#d3bdb1',
        'accent' : '#4c3434',
        'test' : '#00df9a'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}