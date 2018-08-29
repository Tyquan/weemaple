const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	facebook: {
		type: String
	},
	tokens: {
		type: Array
	},
	profile: {
		name: {type: String, default: ''},
		picture: {type: String, default: ''}
	},
	coursesTaught: [{
		course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
	}],
	coursesTaken: [{
		course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
	}],
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;