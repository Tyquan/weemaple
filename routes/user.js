const passport = require('passport');
const passportConfig = require('../config/passport');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
	res.render('accounts/login');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
	scope: 'email'
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/profile',
	failureRedirect: '/login',
}));

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect();
});

router.get('/profile', (req, res, next) => {
	res.render('accounts/profile');
});

module.exports = router;