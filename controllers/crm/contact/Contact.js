const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = Schema({
    userId: {type: String},
    accountId: {type: String},
    createdBy: {type: String},
    updatedBy: {type: String},
    address: {type: String},
    otherDetails: {type: String},
    status: {type: String},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Contact", ContactSchema);;