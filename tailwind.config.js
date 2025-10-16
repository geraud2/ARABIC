/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#CBA76A',
        cream: '#FFF6E5',
        brown: '#8B5E3C',
        'brown-light': '#A67C52',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
