const createError = require('http-errors');
const express = require('express');
const path = require('path');
require('dotenv').config();
const Middleware = require('./Config/Middleware');

const app = express();

Middleware.init(app);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// Auth Apis
app.use('/register', require('./API/auth/registerApi'));
app.use('/login', require('./API/auth/loginApi'));
app.use('/refresh', require('./API/auth/refreshApi'));
app.use('/logout', require('./API/auth/logoutApi'))

// Public Apis
app.use('/api/v1/users', require('./API/userApi'));
app.use('/api/v1/contactMessages', require('./API/contactMessageApi'));
app.use('/api/v1/articles', require('./API/articleApi'));
app.use('/api/v1/escraps', require('./API/escrapApi'));
app.use('/api/v1/gigs', require('./API/gigApi'));
app.use('/api/v1/videos', require('./API/videoApi'));


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