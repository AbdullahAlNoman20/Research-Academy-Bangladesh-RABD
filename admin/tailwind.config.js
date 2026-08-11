// FILE: tailwind.config.js  (full rewrite — no scale-hover, marquee keyframes added)
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
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeSlide: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "10%": { opacity: 1, transform: "translateY(0)" },
          "90%": { opacity: 1 },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-slow": "marquee 50s linear infinite",
        fadeIn: "fadeIn 0.2s ease-out",
        fadeSlide: "fadeSlide 5s ease-in-out infinite",
        shine: "shine 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
