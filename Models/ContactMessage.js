const mongoose = require('mongoose');

const ContactMessageSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    reason: {
        type: String
    },
    description: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

const ContactMessage = mongoose.model("ContactMessage", ContactMessageSchema);

module.exports = ContactMessage;