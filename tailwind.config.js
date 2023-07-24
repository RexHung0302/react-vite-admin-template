/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 禁止 tailwindCSS 默認屬性，避免其他 UI Framework 按鈕顏色消失
  corePlugins: {
    preflight: false,
  }
}

