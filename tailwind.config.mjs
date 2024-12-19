/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bellefair", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["forest"],
  },
  plugins: [require("daisyui")],
};
