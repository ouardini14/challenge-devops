/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif;'] 
      },
    },
  
  },
  plugins: [
    require('@tailwindcss/forms'),
   // require('tw-elements/dist/plugin'),
    require('tailwind-scrollbar')({ nocompatible: true }),

  ],
}