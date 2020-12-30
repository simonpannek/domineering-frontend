const { PurgeCSS } = require("purgecss");

module.exports = async function purgeStyles(content, outputPath) {
    if (outputPath.endsWith(".css")) {
        const [{ css: result }] = await new PurgeCSS().purge({
            content: [
                "src/*.njk",
                "src/_includes/layouts/*.njk",
                "src/_includes/partials/*.njk",
                "src/_includes/assets/js/*.js",

                "build/index.html",
                "build/games/index.html",
                "build/user/index.html"
            ],
            css: [{ raw: content, extension: 'css' }]
        });
        return result;
    }
    return content;
};
