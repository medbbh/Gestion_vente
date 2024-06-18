/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   
    "./src/**/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      animation: {
        'slide-in-out': 'slideInOut 6s ease-in-out infinite',
      },
      keyframes: {
        slideInOut: {
          '0%, 33.33%, 100%': { opacity: 0, transform: 'translateY(100%)' },
          '16.67%, 30%': { opacity: 1, transform: 'translateY(0)' },
        },
    },
  },
  variants: {},
  plugins: [
    require('flowbite/plugin')

  ],
} 
}