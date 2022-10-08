const Database = require('../config/Database');
const User = require('../models/User');

const getUsers = (req, res) => {
    Database.GetData(User, (users, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(users);
    });
}

const getSingleUser = (req, res) => {
    Database.GetSingleData(User, req.params.id, (user, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(user);
    });
};

const createNewUser = (req, res) => {
    Database.PostData(User, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
}

const updateUser = (req, res) => {
    Database.UpdateData(User, req, (error, data) => {
        if (error) res.status(500).json(error);
        res.json(data);
    })
}

const deleteUser = (req, res) => {
    Database.DeleteData(User, req, (error, data) => {
        if (error) res.status(500).json(error);
        res.json(data);
    })
}

module.exports = {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser
};