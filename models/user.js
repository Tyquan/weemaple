const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	profile: {
		name: {type: String, default: ''},
		picture: {type: String, default: ''}
	},
	coursesTaught: [{
		course: {type: Schema.Types.ObjectId, ref: 'Course'}
	}],
	coursesTaken: [{
		course: {type: Schema.Types.ObjectId, ref: 'Course'}
	}],
});

const User = monggose.model('User', UserSchema);

module.exports = User;