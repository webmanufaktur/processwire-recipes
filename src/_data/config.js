const timestamp = new Date();

// if (runMode === "serve" || runMode === "watch") {
//   process.env.BUILD_DRAFTS = true;
//   process.env.PROD_STATE = false;
// }

// const environment = process.env.PROD_STATE;
// const STATE = "PROD";
// const prodUrl = "https://processwire.recipes";
// const devUrl = "http://localhost:8080";
// const isProd = environment === STATE;
// const baseUrl = environment === STATE ? prodUrl : devUrl;

module.exports = function () {
  return {
    title: "ProcessWire Recipes",
    description: "A Collection of ProcessWire Recipes (Code Snippets).",
    domain: process.env.DOMAIN || "localhost:8080",
    url: process.env.URL || "http://localhost:8080",
    timestamp: timestamp * 1000,
    // environment,
    // prodUrl,
    // devUrl,
    // baseUrl,
    // isProd,
  };
};

console.log("XXXXXXXXXXXXXXXXXXXXXX" + process.env.BUILD_DRAFTS);
console.log("XXXXXXXXXXXXXXXXXXXXXX" + process.env.FRITZ);
