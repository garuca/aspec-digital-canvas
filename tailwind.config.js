/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./swift/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#FF6B2C",
          hover: "#E55A1B",
          light: "#FFF0EA",
        },
        background: "#F4F7FA",
        card: "#FFFFFF",
        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
}
