/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', 
    './src/**/*.{html,js,jsx,ts,tsx}',
    './CountDown/*.{html,js,jsx,ts,tsx}' 
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
