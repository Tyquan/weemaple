const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = Schema({
    title: {type: String},
    slug: {type: String},
    description: {type: String},
    type: {type: String},
    active: {type: String},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    content: {type: String}
});

module.exports = mongoose.model("Permission", PermissionSchema);;