/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Matches the web app's @theme accent (apps/web/src/app/globals.css).
        accent: "#c4b5fd",
      },
    },
  },
  plugins: [],
};
