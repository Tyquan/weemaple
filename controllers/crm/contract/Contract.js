const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = Schema({
    userId: {type: String},
    accountId: {type: String},
    contractApproval: {type: String},
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

module.exports = mongoose.model("Contract", ContractSchema);;