const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpportunityContactRoleSchema = Schema({
    userId: {type: String},
    contactId: {type: String},
    opportunityId: {type: String},
    dateTime: {type: String},
    createdBy: {type: String},
    updatedBy: {type: String},
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

module.exports = mongoose.model("OpportunityContactRole", OpportunityContactRoleSchema);;