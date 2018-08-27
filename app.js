const express = require('express');
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

app.use('/', index);

module.exports = app;