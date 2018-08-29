const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

const settings = require('./config/settings');

const index = require('./routes/index');
const user = require('./routes/user');

const app = express();

// mongoose mlab connection
mongoose.connect(settings.database, {
	useNewUrlParser: true
});
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan('dev'));
app.use(session({
  secret: 'keysessionsaidding',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
  	url: settings.database,
  	autoReconnect: true
  }),
  cookie: {maxAge: 180 * 60 * 1000 }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/public`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', index);
app.use('/user', user);

module.exports = app;