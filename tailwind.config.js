module.exports = {
  mode: "jit",
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e1e1e",
        primaryVariant: "#242424",
        onPrimaryVariantHover: "#212121",

        secondary: "#ffffff",
        secondaryVariant: "#ffffffb3",
        secondaryVariant2: "#bebebe"
      },
      gridTemplateRows: {
        'titlePageLayout': '25% 50% 25%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
