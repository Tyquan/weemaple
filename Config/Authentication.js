const bcrypt = require('bcrypt');
const Employee = require('../Models/Employee');
const User = require('../Models/User');

const Authentication = {
    loginEmployee: (req, cb) => {
        loginEntity(req, Employee, cb);
    },
    loginuser: (req, cb) => {
        loginEntity(req, User, cb);
    },
    signupEmployee: (req, cb) => {
        signUpEntity(req, Employee, cb);
    },
    signupUser: (req, cb) => {
        signUpEntity(req, User, cb);
    }
};

function signUpEntity(req, Model, cb) {
    let employee = new Model(req.body);
    bcrypt.hash(employee.password, 10, (err, hash) => {
        if (err) cb({data: {}, message: "Not able to retreive User Model"});
        employee.password = hash;
        employee.save()
            .then((data) => {
                req.session.userModel = data;
                cb({
                    data: data,
                    message: "SUCCESS"
                });
            })
            .catch((err) => {
                cb({data: {}, message: `User Model save error: ${err}`});
            });
    });
}

function loginEntity(req, Model, cb) {
    Model.findOne({
        email: req.body.email
    }, (err, employee) => {
        if (err) throw err;
        if (!employee) {
            cb({data: {}, message: "NO User Model"});
        } else {
            bcrypt.compare(req.body.password, employee.password, (err, match) => {
                if (err) throw err;
                if (!match) cb({data: {}, message: "Incorrect Email or Password"});
                if (match) {
                    req.session.userModel = employee;
                    cb({
                        data: employee,
                        message: "SUCCESS"
                    });
                }
            });
        }
    });
}

module.exports = Authentication;