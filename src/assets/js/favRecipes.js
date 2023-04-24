document.addEventListener("alpine:init", () => {
  Alpine.store("fr", {
    static: Alpine.$persist({
      items: [],
    }).as("favRecipes"),

    toggleItem(title, url) {
      if (this.static.items.includes(title)) {
        this.items = this.items.filter((id) => id !== itemID);
      } else {
        this.static.items.push({
          title,
          url,
        });
      }
    },

    addItem(title, url) {
      this.static.items.push({
        title,
        url,
      });
    },
  });
});

console.log("Favourite recipes: Ready to go");
