const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const settings = require('./config/settings');

const index = require('./routes/index');

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
app.use(express.static(`${__dirname}/public`));
app.set('views', path.join(__dirname, 'views'));
//app.engine('view engine', engine);
app.set('view engine', 'pug');

// Routes
app.use('/', index);

module.exports = app;