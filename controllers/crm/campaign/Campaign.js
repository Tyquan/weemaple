const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = Schema({
    userId: {type: String},
    createdBy: {type: String},
    updatedBy: {type: String},
    title: {type: String},
    metaTitle: {type: String},
    slug: {type: String},
    summary: {type: String},
    objectives: {type: String},
    sponsor: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    otherDetails: {type: String},
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

module.exports = mongoose.model("Campaign", CampaignSchema);;