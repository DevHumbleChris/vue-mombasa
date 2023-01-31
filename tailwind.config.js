/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#84c484',
        secondary: '#36284a'
      },
      fontFamily: {
        secular: ['Secular One', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        comforta: ['Comfortaa', 'cursive']
      }
    },
  },
  plugins: [],
}
