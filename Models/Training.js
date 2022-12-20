const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TrainingSchema = Schema({
    userId: {
        type: String
    },
    title: String,
    companyName: String,
    fee: Number,
    description: String,
    websiteLink: String,
    address: String,
    city: String,
    stateLink: String,
    zipcode: String,
    travelType: String,
    category: String,
    keywords: String,
    contactNumber: String,
    contactEmail: String,
    creationDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: Date
}, {strict: false});

TrainingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Training", TrainingSchema);