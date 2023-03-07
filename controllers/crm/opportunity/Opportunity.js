const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpportunitySchema = Schema({
    userId: {type: String},
    accountId: {type: String},
    title: {type: String},
    description: {type: String},
    detils: {type: String},
    stage: {type: String},
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

module.exports = mongoose.model("Opportunity", OpportunitySchema);;