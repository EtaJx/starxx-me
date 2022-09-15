/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      loading: 'rgba(0, 0, 0, .5)'
    },
    backgroundSize: {
      'theme-toggle': '30px'
    },
    extend: {
      backgroundImage: {
        global: 'url("/texture.png")',
        light: 'url("/light-sun.svg")',
        dark: 'url("/dark-sun.svg")'
      }
    }
  },
  plugins: []
};
