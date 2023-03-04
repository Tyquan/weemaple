const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = Schema({
    userId: {type: String},
    organizationId: {type: String},
    roleId: {type: String},

    createdBy: {type: String},
    updatedBy: {type: String},
    code: {type: String},
    status: {type: String},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    startsAt: {
        type: Date
    },
    endsAt: {
        type: Date
    },
    notes: {type: String}
});

module.exports = mongoose.model("Employee", EmployeeSchema);;