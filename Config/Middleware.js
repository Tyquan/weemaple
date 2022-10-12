const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');
const session = require('cookie-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Optional (cross origin) cors settings
const allowedOrigins = ["https://www.weegigs.net", "https://weegigs.net", "https:www.eezypeezyprint.com", "http://127.0.0.1:5000", "http://localhost:3000"];
const setCorsOptions = () => {
    return {
        origin: (origin, callback) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 200
    };
}

const Middleware = {
    init : (app) =>
    {
        const testDatabaseUrl = 'mongodb://localhost:27017/weemaple';
        mongoose.connect(process.env.MONGODB_URI || testDatabaseUrl);
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(morgan('dev'));
        
        // cookies
        app.use(cookieParser());

        // cors
        app.use(cors(setCorsOptions()));

        // session
        app.use(session({
            name: "session",
            keys: [process.env.SESSION_KEY],
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }));

    }
};

module.exports = Middleware;