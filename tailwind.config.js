/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['font-trusted', 'font-carsole'], // ensure JIT never purges these
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        trusted: ['Trusted', 'sans-serif'],
        carsole: ['Bercarets', 'sans-serif'],
      },
      colors: {
        'brand-navy': '#30378f',
        'brand-blue': '#1a7dc1',
      },
    },
  },
  plugins: [],
};
