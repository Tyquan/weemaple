const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const favicon = require('serve-favicon');
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
        app.use(favicon(path.join(__dirname, '../public/images/fav', 'favicon.ico')));
        
        // view engine setup
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'jade');
        
        // cookies
        app.use(cookieParser());
        // cors
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        }
        app.use(cors(corsOptions));
        //  session
        app.use(session({
            secret: "Herrasecretness",
            resave: false,
            saveUninitialized: true,
            cookie: {secure: true}
        }));

        // const whiteList = ["https://www.weegigs.net", "https:www.eezypeezyprint.com", "http://127.0.0.1:5000", "http://localhost:3000"];

        // const corsOptions = {
        //     origin: (origin, callback) => {
        //         if (whiteList.indexOf(origin) !== -1 || !origin) {
        //             callback(null, true)
        //         } else {
        //             callback(new Error('Not allowed by CORS'));
        //         }
        //     },
        //     optionsSuccessStatus: 200
        // }

        // app.use(cors(corsOptions));
        // app.use(cors())

    }
};

module.exports = Middleware;