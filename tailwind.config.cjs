const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo
      }
    },
  },
  plugins: [
    require('tailwindcss-radix')()
  ],
}
