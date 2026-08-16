/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F1C2E",
        gold: "#D4AF37",
        "blue-accent": "#4A90E2",
        "blue-soft": "#7BA4D4",
      },
    },
  },
  plugins: [],
}
