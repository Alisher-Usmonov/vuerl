/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        work: ["'Work Sans'", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base",
    }),
  ],
};
