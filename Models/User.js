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
        type: String
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
        gigId: {
            type: String
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Gig'
        }
    }],
    articles: [{
        articleId: {
            type: String
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Article'
        }
    }],
    escraps: [{
        escrapId: {
            type: String
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Escrap'
        }
    }],
    videos: [{
        videoId: {
            type: String
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Video'
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