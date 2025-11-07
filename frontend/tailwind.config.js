/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#eaf8ff',
          100: '#d6f0ff',
          500: '#00d8ff',
          700: '#00b8e6'
        },
        neon: '#00ffd1',
        glass: 'rgba(255,255,255,0.06)'
      },
      boxShadow: {
        'glow': '0 6px 30px rgba(0,216,255,0.08)',
      }
    },
  },
  plugins: [],
}
