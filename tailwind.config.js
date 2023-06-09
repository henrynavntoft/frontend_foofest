/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#731649",
        "custom-green": "#055923",
        "custom-beige": "#F2E8B3",
        "custom-yellow": "#F2B705",
        "custom-red": "#E5443B",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-5%)", opacity: "0" },
          "50%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
        bounce600: "bounce 1s infinite 600ms",
      },
    },
  },
  plugins: [],
};
