const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    views: {
        type: Number
    },
    body: {
        type: String
    },
    mainImage: {
        type: String
    },
    contentType: {
        type: String
    },
    userId: {
        type: String
    },
    creationDate: Date,
    modifiedDate: Date
}, {strict: false});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;