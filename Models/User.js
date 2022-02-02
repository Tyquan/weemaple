const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: 'N/A'
    },
    lastName: {
        type: String,
        default: 'N/A'
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        default: 'Users'
    },
    loggedIn: {
        type: Boolean,
        default: 'false'
    },
    password: {
        type: String,
        required: true
    },
    clearenceLevel: {
        type: Number,
        default: 0
    },
    creationDate: Date,
    modifiedDate: Date
});

const User = mongoose.model("User", UserSchema);

module.exports = User;