const mongoose = require('mongoose');

const EscrapSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'No Name Given'
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    addressCity: {
        type: String
    },
    addressState: {
        type: String
    },
    zipcode: {
        type: String
    },
    contactNumber: {
        type: String
    },
    availableTime: {
        type: String
    },
    creationDate: {
        type: Date
    },
    category: {
        type: String
    },
    count: {
        type: Number
    },
    message: {
        type: String
    },
    modifiedDate: {
        type: Date
    }
});

const Escrap = mongoose.model("Escrap", EscrapSchema);

module.exports = Escrap;