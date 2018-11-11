const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

let plugins = [tailwindcss("tailwind.js"), autoprefixer()];
if (process.env.NODE_ENV === "production") {
  plugins.push(
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
  );
}

module.exports = {
  plugins
};
