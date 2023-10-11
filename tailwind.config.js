/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite/plugin";
export default {
  plugins: [flowbite],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "clr-bg1": `var(${"--color-bg-primary"})`,
      "clr-bg2": `var(${"--color-bg-secondary"})`,
      "clr-bg3": `var(${"--color-bg-tertiary"})`,
      "clr-bg4": `var(${"--color-bg-quaternary"})`,
      "clr-bg-extra": `var(${"--color-bg-extra"})`,
      "clr-text1": `var(${"--color-text-primary"})`,
      "clr-text2": `var(${"--color-text-secondary"})`,
      "clr-text3": `var(${"--color-text-tertiary"})`,
      "clr-link": `var(${"--color-text-link"})`,
      "clr-hover": `var(${"--color-text-hover"})`,
      "clr-border": `var(${"--color-border"})`,
      "clr-success": "rgb(34, 139, 34)",
      "clr-error": "rgb(139, 0, 0)",
      white: "rgb(255,255,255)",
      black: "rgb(0,0,0)",
    },
    fontFamily: {
      "ff-primary": `var(${"--font-family-primary"})`,
    },
    fontSize: {
      "fs-h1": "24px",
      "fs-h2": "18px",
      "fs-h3": "14px",
      "fs-h4": "12px",
      "fs-icon-lg": "32px",
    },
  },
};
