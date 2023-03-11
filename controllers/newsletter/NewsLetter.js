const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsletterSchema = Schema({
    title: {type: String},
    subject: {type: String},
    website: {type: String},
    htmlFile: {type: String},
    intro: {type: String},
    body: {type: String},
    conclusion: {type: String},
    closing: {type: String},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);;