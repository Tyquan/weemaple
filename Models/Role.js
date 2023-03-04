const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = Schema({
    roleId: {type: String},
    title: {type: String},
    slug: {type: String},
    description: {type: String},
    type: {type: String},
    active: {type: String},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date},
    content: {type: String}
});
module.exports = mongoose.model("Role", RoleSchema);;