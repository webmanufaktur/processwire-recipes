module.exports = function () {
    return {
        optimize: process.env.OPTIMIZE || "development", // production
        title: process.env.TITLE || "A 11ty Project",
        description:
            process.env.DESCRIPTION || "A 11ty Project Starter Package",
        lang: process.env.LANGUAGE || "en",
        locale: process.env.LOCALE || "en_EN",
        domain: process.env.DOMAIN || "localhost:8080",
        url: process.env.URL || "http://localhost:8080",
        company: process.env.COMPANY || "ACME Global Inc.",
        phone: process.env.PHONE || "555-SHOE",
        email: process.env.EMAIL || "you@example.com",
        author: process.env.AUTHOR || "John Doe",
    };
};
