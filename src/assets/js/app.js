document.addEventListener("alpine:init", () => {
  console.log(123),
    Alpine.store("pwr", {
      static: Alpine.$persist({
        version: 1,
      }).as("pwrecipes"),

      frank: true,
      joshi: true,

      toggleFrank() {
        this.joshi = !this.joshi;
        console.log(this.joshi);
      },
    });
});

console.log("app.js is available");

// we check for updates on local storage and reload all browser showing this website
window.addEventListener("storage", () => {
  location.reload();
});
