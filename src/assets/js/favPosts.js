document.addEventListener("alpine:init", () => {
  Alpine.store("fp", {
    static: Alpine.$persist({
      posts: [],
    }).as("favPosts"),
  });
});

console.log("Favourite posts: Ready to go");
