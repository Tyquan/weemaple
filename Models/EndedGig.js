const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EndedGigSchema = Schema({
    userId: {
        type: String
    },
    title: String,
    compensation: Number,
    payPeriod: String,
    description: String,
    websiteLink: String,
    facebookLink: String,
    twitterLink: String,
    instagramLink: String,
    address: String,
    city: String,
    stateLink: String,
    zipcode: String,
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
            creationDate: Date,
            modifiedDate: Date
        }
    ]
}, {strict: false});

const EndedGig = mongoose.model("EndedGig", EndedGigSchema);

module.exports = EndedGig;