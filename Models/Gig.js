const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GigSchema = Schema({
    userId: {
        type: String
    },
    title: String,
    companyName: String,
    compensation: Number,
    payPeriod: String,
    description: String,
    educationalRequirements: String,
    websiteLink: String,
    facebookLink: String,
    twitterLink: String,
    instagramLink: String,
    address: String,
    city: String,
    stateLink: String,
    zipcode: String,
    travelType: String,
    viewCount: {
        type: Number,
        default: 0
    },
    category: String,
    keywords: String,
    contactNumber: String,
    contactEmail: String,
    creationDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: Date,
    applicants: [
        {
            userId: String,
            message: String,
            name: String,
            email: String,
            contactNumber: String,
            reference: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User'
            },
            creationDate: {
                type: Date,
                default: Date.now()
            },
            modifiedDate: Date
        }
    ]
}, {strict: false});

GigSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Gig", GigSchema);