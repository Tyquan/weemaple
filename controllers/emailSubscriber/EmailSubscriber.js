const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSubscriberSchema = Schema({
    email: {type: String},
    name: {type: String},
    website: {type: String},
    betaSubscriber: {type: Boolean},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    note: {type: String}
});

module.exports = mongoose.model("EmailSubscriber", EmailSubscriberSchema);;