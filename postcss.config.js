const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");
module.exports = {
  plugins: [
    tailwindcss("tailwind.js"),
    autoprefixer(),
    purgecss({
      content: ["./src/**/*.html", "./src/**/*.vue"]
    })
  ]
};
