const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationMetaSchema = Schema({
    organizationId: {type: String},
    key: {type: String},
    content: {type: String}
});

module.exports = mongoose.model("OrganizationMeta", OrganizationMetaSchema);;