const mongoose = require('mongoose');

const ContactMessageSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    application: {
        type: String
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