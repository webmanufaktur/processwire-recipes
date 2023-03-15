require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");

const markdownIt = require("markdown-it");
const markdownItImageFigures = require("markdown-it-image-figures");
const mila = require("markdown-it-link-attributes");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");
const pluginTOC = require("eleventy-plugin-toc");
const svgContents = require("eleventy-plugin-svg-contents");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const faviconPlugin = require("eleventy-favicon");
const EleventyPluginOgImage = require("eleventy-plugin-og-image");

// Details about HowTo enable MarkdownIt Image Figures
// https://github.com/Antonio-Laguna/markdown-it-image-figures
// https://github.com/11ty/eleventy/issues/675#issuecomment-527700027

const markdown = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});
markdown.use(markdownItImageFigures, {
  lazy: true,
  async: true,
  classes: "lazy",
  figcaption: true,
});
markdown.use(markdownItAnchor);
markdown.use(mila, [
  {
    matcher(href, config) {
      return href.startsWith("https:");
    },
    attrs: {
      target: "_blank",
      rel: "nofollow noopener noreferrer",
    },
  },
  {
    matcher(href, config) {
      return href.startsWith("mailto");
    },
    attrs: {
      rel: "nofollow noopener noreferrer",
    },
  },
  {
    matcher(href, config) {
      return href.startsWith("tel");
    },
    attrs: {
      rel: "nofollow noopener noreferrer",
    },
  },
]);

// 11ty image plugin
// basic setup from tutorial
// https://www.11ty.dev/docs/plugins/image/
function relativeToInputPath(inputPath, relativeFilePath) {
  let split = inputPath.split("/");
  split.pop();

  return path.resolve(split.join(path.sep), relativeFilePath);
}
async function imageShortcodeRelative(src, alt, cls, wdth = "null") {
  let file = relativeToInputPath(this.page.inputPath, src);
  let metadata = await Image(file, {
    widths: wdth,
    formats: ["webp"],
    urlPath: "/assets/media/", // used in frontend
    outputDir: "_site/assets/media/", // used in dev
    // filenameFormat: function (id, src, width, format) {
    //     const extension = path.extname(src);
    //     const name = path.basename(src, extension);
    //     return `${name}-${id}-${width}w.${format}`;
    // },
  });
  let imageAttributes = {
    alt,
    class: cls,
    sizes: "auto",
    loading: "lazy",
    decoding: "async",
  };

  return (
    `<div class="breakout">` +
    Image.generateHTML(metadata, imageAttributes) +
    `</div>`
  );
}

async function imageShortcode(src, alt, cls, wdth = "null") {
  let metadata = await Image(src, {
    widths: wdth,
    formats: ["jpg", "webp"],
    urlPath: "/assets/media/", // used in frontend
    outputDir: "_site/assets/media/", // used in dev
    // filenameFormat: function (id, src, width, format) {
    //   const extension = path.extname(src);
    //   const name = path.basename(src, extension);

    //   return `${name}-${id}-${width}w.${format}`;
    // },
    cacheOptions: {
      duration: "1d",
      directory: ".cache",
      removeUrlQueryParams: true,
    },
  });
  let imageAttributes = {
    alt,
    class: cls,
    sizes: "auto",
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

// module exports
module.exports = function (eleventyConfig) {
  // custom collection
  eleventyConfig.addCollection("featured", function (collection) {
    return collection.getAll().filter((item) => item.data.featured);
  });

  // Set directories to pass through to the _site folder
  eleventyConfig.addPassthroughCopy("src/assets/fonts/");
  eleventyConfig.addPassthroughCopy("src/google10e1d7d7dc049d58.html");

  // Inline SVGs
  // eleventyConfig.addPlugin(svgContents);

  // Favicon generator
  // eleventyConfig.addPlugin(faviconPlugin);

  // TOC
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"], // which heading tags are selected headings must each have an ID attribute
    wrapper: "div", // element to put around the root `ol`/`ul`
    wrapperClass: "toc prose", // class for the element around the root `ol`/`ul`
    ul: true, // if to use `ul` instead of `ol`
    flat: false, // if subheadings should appear as child of parent or as a sibling
  });

  // Syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  // asset management
  // 2023-02-21
  // eleventyConfig.addPlugin(pluginPageAssets, {
  //     mode: "directory",
  //     postsMatching: "src/**/*.md",
  //     assetsMatching: "*.jpg|*.png|*.gif|*.mp4|*.webp|*.webm|.svg",
  //     silent: true,
  // });

  // RSS Feeds
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default", // opt-out of <img/>-style XHTML single tags
    },
  });

  // SHORTCODES
  // 11ty image plugin shortcode
  eleventyConfig.addNunjucksAsyncShortcode("img", imageShortcodeRelative);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // shortcode for inserting the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // ogimage2

  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    satoriOptions: {
      fonts: [
        {
          name: "Montserrat",
          data: fs.readFileSync(
            "./src/assets/fonts/montserrat/montserrat-v25-latin-regular.woff"
          ),
          weight: 400,
          style: "normal",
        },
      ],
    },
    hashLength: 16,
    outputDir: "_site/assets/media/",
    urlPath: "/assets/media/",
  });

  // rating
  eleventyConfig.addFilter("rating", function (rating) {
    let output = "";
    for (let i = 0; i < rating; i++) {
      output += "<div class='text-yellow-500'>★</div>";
    }
    for (let i = rating; i < 5; i++) {
      output += "<div class='text-zinc-500'>★</div>";
    }
    return output;
  });
  //excerpt
  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  // FILTERS
  // convert date to [Month DD, YYYY], set timezone to UTC to ensure date is not off by one
  // https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html
  // https://www.11ty.dev/docs/dates/#dates-off-by-one-day
  eleventyConfig.addFilter("postDate", (dateObj) => {
    // return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(
    //     DateTime.DATE_FULL
    // );
    // return DateTime.fromJSDate(dateObj).toLocaleString();
    // return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
    return DateTime.fromJSDate(dateObj).toFormat("dd.MM.yyyy");
  });

  eleventyConfig.addFilter("slice", (array, start, end) => {
    return end ? array.slice(start, end) : array.slice(start);
  });

  // Sort items by data.title
  eleventyConfig.addFilter("sortByTitle", (values) => {
    return values
      .slice()
      .sort((a, b) => a.data.title.localeCompare(b.data.title));
  });
  // Sort items by data.title but in reverse
  eleventyConfig.addFilter("sortByTitleReverse", (values) => {
    return values
      .slice()
      .sort((b, a) => a.data.title.localeCompare(b.data.title));
  });
  // Sort items by order
  eleventyConfig.addFilter("sortByOrderReverse", (values) => {
    return values.slice().sort((b, a) => a.data.order - b.data.order);
  });
  // Sort items by order but reversed
  eleventyConfig.addFilter("sortByOrder", (values) => {
    return values.slice().sort((a, b) => a.data.order - b.data.order);
  });
  // Sort items by order but reversed
  eleventyConfig.addFilter("sortByRating", (values) => {
    return values.slice().sort((a, b) => b.data.rating - a.data.rating);
  });

  // Sort items by date - old to new
  eleventyConfig.addFilter("sortOldNew", (values) => {
    return values.slice().sort((a, b) => a.data.date - b.data.date);
  });
  // Sort items by date - new to old
  eleventyConfig.addFilter("sortNewOld", (values) => {
    return values.slice().sort((b, a) => a.data.date - b.data.date);
  });

  // CSS Inline
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // TAG CLOUD
  // Return all the tags used in a collection
  eleventyConfig.addFilter("getAllTags", (collection) => {
    let collectionSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((item) => collectionSet.add(item));
    }
    return Array.from(collectionSet);
  });

  // Return all the authors used in a collection
  eleventyConfig.addFilter("getAllAuthors", (collection) => {
    let collectionSet = new Set();
    for (let item of collection) {
      (item.data.authors || []).forEach((item) => collectionSet.add(item));
    }
    return Array.from(collectionSet).sort();
  });

  // Return all the categories used in a collection
  eleventyConfig.addFilter("getAllCategories", (collection) => {
    let collectionSet = new Set();
    for (let item of collection) {
      (item.data.categories || []).forEach((item) => collectionSet.add(item));
    }
    return Array.from(collectionSet);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || [])
      .filter(
        (tag) =>
          [
            "all",
            "nav",
            "post",
            "posts",
            "pages",
            "snippets",
            "links",
            "pillows",
            "recipes",
          ].indexOf(tag) === -1
      )
      .sort();
  });

  // TRANSFORMS
  // HTML MINIFIER
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (
      process.env.PROD_STATE == "PROD" &&
      this.outputPath &&
      this.outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // set markdown engine
  eleventyConfig.setLibrary("md", markdown);

  // Adding Draft Functionality
  // When `eleventyExcludeFromCollections` is true,
  // the file is not included in any collections
  eleventyConfig.addGlobalData(
    "eleventyComputed.eleventyExcludeFromCollections",
    function () {
      return (data) => {
        // Always exclude from non-watch/serve builds
        if (data.draft && !process.env.BUILD_DRAFTS) {
          return true;
        }

        return data.eleventyExcludeFromCollections;
      };
    }
  );

  eleventyConfig.on("eleventy.before", ({ runMode }) => {
    // Set the environment variable
    if (runMode === "serve" || runMode === "watch") {
      process.env.BUILD_DRAFTS = true;
    }
  });

  return {
    // set the input and output directories
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
