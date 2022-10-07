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
        default: 'User'
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Employee: Number,
        Admin: Number
    },
    refreshToken: [String],
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
    gigs: [{
        userId: {
            type: String
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Gig'
        }
    }],
    creationDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: Date
});

const User = mongoose.model("User", UserSchema);

module.exports = User;