/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sand: {
          50: '#fefdf8',
          100: '#fefbf0',
          200: '#fef7e0',
          300: '#feeed1',
          400: '#fde68a',
          500: '#fbbf24',
          600: '#d97706',
          700: '#a16207',
          800: '#78350f',
          900: '#451a03',
        },
        tropical: {
          green: '#00cc66',
          orange: '#ff9900',
          purple: '#cc33ff',
          blue: '#0080ff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}