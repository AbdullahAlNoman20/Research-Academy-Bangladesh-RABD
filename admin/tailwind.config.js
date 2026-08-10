/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0F2A52", dark: "#081A36", light: "#1E3F6E" },
        secondary: { DEFAULT: "#F2A93B", dark: "#D98F1F", light: "#F7C46C" },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          700: "#334155",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(15, 42, 82, 0.08)",
      },
    },
  },
  plugins: [],
};
