module.exports = config => {

    // Data merge
    config.setDataDeepMerge(true);

    // Layouts
    config.addLayoutAlias("default", "layouts/default.njk");

    return {
        dir: {
            input: "src",
            output: "build"
        },
        templateFormats: ["md", "njk", "html"],
        dataTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    }
}
