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
        neo: {
          yellow: '#FFE600',
          pink: '#FF007F',
          cyan: '#00F0FF',
          green: '#00E676',
          purple: '#A855F7',
          orange: '#FF7A00',
          bg: '#FFFDF5',
          darkBg: '#0D0F17',
          card: '#FFFFFF',
          darkCard: '#161922',
          black: '#0A0A0A',
        }
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #000000',
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        'neo-white': '4px 4px 0px 0px #FFFFFF',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
