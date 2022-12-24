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
    city: String,
    stateLink: String,
    category: String,
    days: String,
    classTime: String,
    viewCount: {
        type: Number,
        default: 0
    },
    prerequisites: String,
    educationalRequirements: String,
    lastSignupDate: {
        type: Date
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: Date
}, {strict: false});

TrainingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Training", TrainingSchema);