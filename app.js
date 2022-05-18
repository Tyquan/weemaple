var createError = require('http-errors');
const express = require('express');
var path = require('path');
require('dotenv').config();
const Middleware = require('./Config/Middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const Article = require('./API/Article/Article');
const Escrap = require('./API/Escrap/Escrap');
const Gig = require('./API/Gig/Gig');
const Video = require('./API/Video/Video');
const ContactMessage = require('./API/ContactMessage/ContactMessage');
const User = require('./API/User/User');

const app = express();

Middleware.init(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', User);
app.use('/api/v1/articles', Article);
app.use('/api/v1/escraps', Escrap);
app.use('/api/v1/gigs', Gig);
app.use('/api/v1/videos', Video);
app.use('/api/v1/contactMessages', ContactMessage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
