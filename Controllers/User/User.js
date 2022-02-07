const express = require('express');
const Database = require('../../Config/Database');
const User = require('../../Models/User');
const Authentication = require('../../Config/Authentication');
const UserApi = express.Router();

UserApi.get('/', (req, res) => {
    Database.GetData(User, (users) => {
        console.log("User GET:", users);
        res.status(200).json(users);
    });
});

UserApi.get('/:id', async (req, res) => {
    try {
        let user = await Database.GetSingleData(User, req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.log("Error Getting User data: ", error);
        res.status(500).json(error);
    }
    
});

UserApi.post('/signup', (req, res) => {
    Authentication.signupUser(req, (data) => {
        res.status(200).json(data);
    });
    // Database.PostData(User, req, (data) => {
    //     console.log(data);
    //     res.json(data);
    // });
});

UserApi.post('/login', (req, res) => {
    Authentication.loginUser(req, (data) => {
        console.log("BACKEND DATA:", data);
        res.json(data);
    });
});

UserApi.put('/:id', (req, res) => {
    Database.UpdateData(User, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

UserApi.delete('/:id', (req, res) => {
    Database.DeleteData(User, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = UserApi;