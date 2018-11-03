const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

module.exports = {
  plugins: [
    tailwindcss("tailwind.js"),
    autoprefixer(),
    purgecss({
      whitelist: ["p"],
      content: ["./public/**/*.html", "./src/**/*.vue"],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["js", "vue", "html"]
        }
      ]
    })
  ]
};
