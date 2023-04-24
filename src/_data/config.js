const timestamp = new Date();

const environment = process.env.ELEVENTY_ENV;
const PROD_STATE = "PROD";
const prodUrl = "https://processwire.recipes";
const devUrl = "http://localhost:8080";
const isProd = environment === PROD_STATE;
const baseUrl = environment === PROD_STATE ? prodUrl : devUrl;

module.exports = function () {
  return {
    title: "ProcessWire Recipes",
    description: "A Collection of ProcessWire Recipes (Code Snippets).",
    domain: process.env.DOMAIN || "localhost:8080",
    url: process.env.URL || "http://localhost:8080",
    timestamp: timestamp * 1000,
    environment,
    prodUrl,
    devUrl,
    baseUrl,
    isProd,
  };
};
