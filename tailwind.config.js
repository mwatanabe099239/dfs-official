/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-white': '#373943',
        'landing-color': 'rgb(20, 21, 26)'
      },
      fontFamily: {
        zen: ['Zen Dots', 'sans-serif'], // Add "Zen Dots" font here
        space: ['Space Grotesk', 'sans-serif']
      },

    },
  },
  plugins: [],
};
