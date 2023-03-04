const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = Schema({
    createdBy: {type: String},
    updatedBy: {type: String},
    title: {type: String},
    metaTitle: {type: String},
    slug: {type: String},
    summary: {type: String},
    status: {type: String},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    profile: {type: String},
    content: {type: String}
});

module.exports = mongoose.model("Organization", OrganizationSchema);;