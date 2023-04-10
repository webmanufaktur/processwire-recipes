document.addEventListener("alpine:init", () => {
  console.log("AlpineJS is ready to go"),
    Alpine.store("pwr", {
      static: Alpine.$persist({
        version: 1,
      }).as("pwrecipes"),

      // frank: true,
      // joshi: true,

      // toggleFrank() {
      //   this.joshi = !this.joshi;
      //   console.log(this.joshi);
      // },
    });
});

console.log("app.js is ready to go");

// we check for updates on local storage and reload all browser showing this website
// window.addEventListener("storage", () => {
//   location.reload();
// });
