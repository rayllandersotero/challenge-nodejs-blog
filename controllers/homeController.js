exports.index = (req, res) => {
    res.render('home', {
        "pageTitle": "Página inicial",
        "html": "<p>Renderizando <strong>HTML</strong></p>",
        "techs": {
            "active": true,
            "tech": [
                "Node",
                "PHP",
                "JS"
            ]
        },
        "social": {
            "active": true,
            "links": [
                { "link": "@rayllandersotero" },
                { "link": "@adsvantage" }
            ]
        },
    })
}