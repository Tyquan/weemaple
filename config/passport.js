const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const settings = require('./settings');
const User = require('../models/user');

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(new FacebookStrategy({
	clientID: settings.facebook.clientId,
	clientSecret: settings.facebook.clientSecret,
	callbackURL: settings.facebook.calbackUrl
}, (req, token, refreshToken, profile, done) => {
	User.findOne({ facebook: profile.id }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (user) {
			return done(null, user);
		} else {
			let newUser = new User();
			newUser.email = profile._json.email;
			newUser.facebook = profile.id;
			newUser.tokens.push({kind: 'facebook', token: token});
			newUser.profile.name = profile.displayName;
			newUser.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
			newUser.save((err) => {
				if(err) {
					throw err;
				} else {
					return done(null, newUser);
				}
			});
		}
	});
}));