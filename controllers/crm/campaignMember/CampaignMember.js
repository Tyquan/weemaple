const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignMemberSchema = Schema({
    userId: {type: String},
    campaignId: {type: String},
    leadId: {type: String}, // client possible leads
    memberId: {type: String},
    campaignRole: {type: String},
    createdBy: {type: String},
    updatedBy: {type: String},
    summary: {type: String},
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
    }
});

module.exports = mongoose.model("CampaignMember", CampaignMemberSchema);;