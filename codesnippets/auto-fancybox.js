$("[href^='/site/assets/files/']")
    .filter(function () {
        return this.href.match(/.*[jpg|png|gif]$/i);
    })
    .addClass("to-fancy");



