const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GigSchema = Schema({
    userId: {
        type: String
    },
    title: String,
    creationDate: Date,
    modifiedDate: Date
}, {strict: false});

const Gig = mongoose.model("Gig", GigSchema);

module.exports = Gig;