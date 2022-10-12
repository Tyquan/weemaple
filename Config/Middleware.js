const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');

const cors = require('cors');
const session = require('cookie-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const Middleware = {
    init : (app) =>
    {
        const dbUrl = 'mongodb://localhost:27017/weemaple';

        mongoose.connect(process.env.MONGODB_URI || dbUrl);
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(morgan('dev'));
        
        // cookies
        app.use(cookieParser());

        // cors
        // const whiteList = ["https://www.weegigs.net", "https:www.eezypeezyprint.com", "http://127.0.0.1:5000", "http://localhost:3000"];

        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        }

        app.use(cors(corsOptions));

        // session
        app.use(session({
            name: "session",
            keys: [process.env.SESSION_KEY],
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
            // resave: false,
            // saveUninitialized: true,
            // cookie: {secure: true}
        }));

    }
};

module.exports = Middleware;