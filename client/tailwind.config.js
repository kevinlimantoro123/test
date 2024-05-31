/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "bg-indigo-500",
    "bg-gray-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-purple-500",
    "text-indigo-500",
    "text-gray-500",
    "text-green-500",
    "text-blue-500",
    "text-red-500",
    "text-purple-500",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans"]
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}