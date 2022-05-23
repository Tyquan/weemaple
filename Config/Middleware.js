const path = require('path');
const mongoose = require("mongoose");
const morgan = require('morgan');
//const favicon = require('serve-favicon');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
var cookieParser = require('cookie-parser');

const Middleware = {
    init : (app) =>
    {
        const dbUrl = 'mongodb://localhost:27017/weemaple';

        mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

        app.use(morgan('dev'));
        //app.use(favicon(path.join(__dirname, '../Public', 'favicon.ico')));
        
        // view engine setup
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'jade');

        // app.use(logger('dev'));
        
        app.use(cookieParser());
        
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