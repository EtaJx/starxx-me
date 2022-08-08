/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      loading: 'rgba(0, 0, 0, .12)'
    },
    extend: {}
  },
  plugins: []
};
