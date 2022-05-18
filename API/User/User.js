const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Database = require('../../Config/Database');
const User = require('../../Models/User');
const Authentication = require('../../Config/Authentication');
const UserApi = express.Router();

// Get all users
UserApi.get('/', (req, res) => {
    User.find().then((users) => {
        console.log("Users GET:", users)
        res.status(200).json(users);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

// Get a single user
UserApi.get('/:id', async (req, res) => {
    try {
        let user = await Database.GetSingleData(User, req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.log("Error Getting User data: ", error);
        res.status(500).json(error);
    }
    
});

// Sign up user
UserApi.post('/signup', (req, res) => {
    let employee = new User(req.body);
    bcrypt.hash(employee.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json(err);
        }
        employee.password = hash;
        employee.loggedIn = true;
        console.log("Employee:", employee)
        employee.save()
            .then((data) => {
                req.session.user = data;
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });
});

// Log user in
UserApi.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, employee) => {
        if (err) throw err;
        if (!employee) {
            res.status(500).json("NO User Model");
        } else {
            bcrypt.compare(req.body.password, employee.password, (err, match) => {
                if (err) throw err;
                if (!match) res.status(500).json("Incorrect Email or Password");
                if (match) {
                    req.session.user = employee;
                    res.status(200).json(employee);
                }
            });
        }
    });
});

// Log user Out
UserApi.post('/logout', (req, res) => {
    User.findById(req.params.id).then((data) => {
        data.loggedIn = false;
        req.session.user = {};
    }).catch((err) => {
        res.status(500).json({err: err, message: "Error finding user"});
    });
});

// Update User Data
UserApi.put('/:id', (req, res) => {
    Database.UpdateData(User, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

// Delete a User
UserApi.delete('/:id', (req, res) => {
    Database.DeleteData(User, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = UserApi;