const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = Schema({
    userId: {type: String},
    title: {type: String},
    description: {type: String},
    phoneNumber: {type: String},
    billingAddress: {type: String},
    shippingAdress: {type: String},
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

module.exports = mongoose.model("Account", AccountSchema);;