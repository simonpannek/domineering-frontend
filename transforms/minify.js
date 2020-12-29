const htmlmin = require("html-minifier");
const terser = require("terser");
const cleancss = require("clean-css");

module.exports = async (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
        return htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            quoteCharacter: "'",
            minifyURLs: true
        });
    } else if (outputPath.endsWith(".js")) {
        return (await terser.minify(content)).code;
    } else if (outputPath.endsWith(".css")) {
        return new cleancss().minify(content).styles;
    }
    return content;
};
