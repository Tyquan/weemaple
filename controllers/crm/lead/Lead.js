const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeadSchema = Schema({
    userId: {type: String},
    createdBy: {type: String},
    updatedBy: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    website: {type: String},
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

module.exports = mongoose.model("Lead", LeadSchema);;