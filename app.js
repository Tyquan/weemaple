const createError = require('http-errors');
const favicon = require('serve-favicon');
const express = require('express');
const path = require('path');
require('dotenv').config();

const Middleware = require('./Config/Middleware');
const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users')

const register = require('./API/auth/registerApi');
const login = require('./API/auth/loginApi');
const refresh = require('./API/auth/refreshApi');
const logout = require('./API/auth/logoutApi');
const usersApi = require('./API/userApi');
const messages = require('./API/contactMessageApi');
const articles = require('./API/articleApi');
const escraps = require('./API/escrapApi');
const gigs = require('./API/gigApi');
const videos = require('./API/videoApi');

const organizations = require('./controllers/organization/organizationApi');

const app = express();

Middleware.init(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images/fav', 'favicon.ico')));

// view engine setupnpm
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);


// Auth Apis
app.use('/register', register);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/logout', logout);

// Public Apis
app.use('/api/v1/users', usersApi);
app.use('/api/v1/contactMessages', messages);
app.use('/api/v1/articles', articles);
app.use('/api/v1/escraps', escraps);
app.use('/api/v1/gigs', gigs);
app.use('/api/v1/videos', videos);
app.use('/api/v1/organizations', organizations);

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