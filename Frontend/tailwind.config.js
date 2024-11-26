/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        montserrat:['Montserrat','sans-serif'],
        cursive: ['Dancing Script', 'cursive'],
      },
      animation:{
        marquee:'marquee 20s linear infinite',
      },
      keyframes:{
        marquee:{
          '0%':{transform:'translateX(50%)'},
          '100%':{transform:'translateX(-70%)'},
        }
      }
    },
  },
  plugins: [],
}