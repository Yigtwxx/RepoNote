/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#030014',
        primary: '#7042f8',
        secondary: '#00f6ff',
        text: '#ffffff',
        muted: '#8b8b99',
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at center, #1b1b3a 0%, #030014 100%)',
      },
    },
  },
  plugins: [],
}
