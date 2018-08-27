const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	wistiaId: {
		type: String
	}
	price: {
		type: Number
	},
	taughtBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	students : [{
		user: {type: Schema.Types.ObjectId, ref: 'User'}
	}],
	totalStudents: {
		type: Number
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

const Course = monggose.model('Course', CourseSchema);

module.exports = Course;