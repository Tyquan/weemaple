const path = require('path');
const mongoose = require("mongoose");
const morgan = require('morgan');
const favicon = require('serve-favicon');
const cors = require('cors');
const session = require('express-session');

const Middleware = {
    init : (app) =>
    {
        const dbName = "herrahiphop";
        const dbUrl = `mongodb://localhost:27017/${dbName}`;

        mongoose.connect(dbUrl);
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

        app.use(morgan('dev'));
        app.use(favicon(path.join(__dirname, '../Public', 'favicon.ico')));
        app.use(cors({
            origin: '*'
        }));
        app.use(session({
            secret: "Herrasecretness",
            resave: false,
            saveUninitialized: true,
            cookie: {secure: true}
        }));
    }
};

module.exports = Middleware;