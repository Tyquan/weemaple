const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: 'N/A'
    },
    lastName: {
        type: String,
        default: 'N/A'
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        default: 'Weemaple Employee'
    },
    loggedIn: {
        type: Boolean,
        default: 'false'
    },
    password: {
        type: String,
        required: true
    },
    clearenceLevel: {
        type: Number,
        default: 0
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: Date
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;