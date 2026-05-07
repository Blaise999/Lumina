/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lum: {
          50: '#FAFAF8', 100: '#F5F3EF', 200: '#E8E4DD', 300: '#C9C1B5',
          400: '#8B7E74', 500: '#6B5E54', 600: '#4A3F37', 700: '#2C2C2C',
          800: '#1A1A1A', 900: '#0D0D0D',
          teal: '#00BFA5', 'teal-dark': '#00897B', 'teal-light': '#E0F7F3',
          rose: '#E8B4B8', 'rose-light': '#FFF0F2',
          gold: '#C49A3C', 'gold-light': '#FFF8E7',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
