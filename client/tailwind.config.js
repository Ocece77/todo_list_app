/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'fancy': 'url(hand.cur), pointer',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.1)' }
        }, 
        slideIn:{
          '0%': { transform: 'translateX(100%)' },
        },
        slideReverse:{
          '0%': { transform: 'translateX(-80%)' },
        }
      },
      animation: {
        'spin-slow': 'spin 19s linear infinite',
        'pop-in' : "pop .7s ease-out",
        'slide-in': "slideIn .7s ease",
         'slide-in-reverse': "slideReverse 1s ease"
      }
    },
  },
  plugins: [],
}