const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');
const session = require('cookie-session');
// const session = require('express-session');
// const fileStore = require("session-file-store")(session);
require('dotenv').config();
const cookieParser = require('cookie-parser');
const credentials = require('../middleware/credentials');

// Optional (cross origin) cors settings
const allowedOrigins = ["https://www.weegigs.net", "https://weegigs.net", "https://www.eezypeezyprint.com", "https://eezypeezyprint.com", "http://127.0.0.1:5000", "http://localhost:3000", "http://localhost:3000/"];
const setCorsOptions = () => {
    return {
        origin: (origin, callback) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        // credentials: true,
        optionsSuccessStatus: 200
    };
}

const Middleware = {
    init : (app) =>
    {
        const testDatabaseUrl = 'mongodb://127.0.0.1:27017/weemaple';
        mongoose.connect(process.env.MONGODB_URI || testDatabaseUrl);
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        
        app.set('trust proxy', 1) // trust first proxy
        app.use(credentials);
        // cors
        // app.use(cors(setCorsOptions()));
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(morgan('dev'));
        
        // cookies
        app.use(cookieParser());

        // session
        app.use(session({
            name: "session",
            keys: [process.env.SESSION_KEY],
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }));

    }
};

module.exports = Middleware;