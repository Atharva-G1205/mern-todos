import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geistmono: ['Geist Mono', 'sans-serif'],
        adwaita: ['Adwaita Mono', 'monospace']
      }
    },
  },
  plugins: [daisyui],
  daisyui:{
    themes: ['dark'],
  },
}