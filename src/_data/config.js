const timestamp = new Date();

module.exports = function () {
  return {
    title: "ProcessWire Recipes",
    description: "A Collection of ProcessWire Recipes (Code Snippets).",
    domain: process.env.DOMAIN || "localhost:8080",
    url: process.env.URL || "http://localhost:8080",
    timestamp: timestamp * 1000,
  };
};
