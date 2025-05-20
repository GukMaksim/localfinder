/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-focus': '#4338CA',
        'primary-content': '#FFFFFF',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#4F46E5",
        "primary-focus": "#4338CA",
        "primary-content": "#FFFFFF",
      }
    }],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
} 