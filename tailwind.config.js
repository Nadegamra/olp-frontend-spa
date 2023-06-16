/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/tw-elements/dist/js/**/*.js"
 ],
 theme: {
  colors: {
      'bg-primary': `var(${'--color-bg-primary'})`,
      'bg-secondary': `var(${'--color-bg-secondary'})`,
      'bg-tertiary': `var(${'--color-bg-tertiary'})`,
      'bg-extra': `var(${'--color-bg-extra'})`,
      't-primary': `var(${'--color-text-primary'})`,
      't-secondary': `var(${'--color-text-secondary'})`,
      't-tertiary': `var(${'--color-text-tertiary'})`,
      't-hover': `var(${'--color-text-hover'})`,
      'white': 'rgb(255,255,255)',
      'black': 'rgb(0,0,0)'
  },
  fontFamily: {
      'ff-primary': `var(${'--font-family-primary'})`,
  },
  fontSize: {
      'fs-h1': "25px",
      'fs-h2': "16px",
      'fs-primary': "12px",
  },
 }
}

