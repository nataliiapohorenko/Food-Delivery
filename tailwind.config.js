/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE724C',
        secondary: '#FFC529',
        lightGray: '#D4D5DA',
        darkGray: '#9796A1'
      },
    },
  },
  plugins: [],
};
