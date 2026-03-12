/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        myfirst: {
          '0%': { left: '-25%' },
          '100%': { left: '100%' },
        }
      },
      animation: {
        'car-move': 'myfirst 22s linear infinite',
        'bike-move': 'myfirst 30s linear infinite',
      }
    },
  },
  plugins: [],
    
}