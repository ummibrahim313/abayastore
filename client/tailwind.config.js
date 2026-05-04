/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          dark: '#2D0A1E',
          main: '#7B2D4A',
          light: '#E8B4C8',
          background: '#F9F0F4',
        },
      },
      fontFamily: {
        heading: ['Raleway', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        display: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
}
