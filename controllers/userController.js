const databaseApi = require('./databaseApi/databaseApi');
const User = require('../models/User');

const getUsers = (req, res) => {
    databaseApi.GetData(User, (users, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(users);
    });
}

const getSingleUser = (req, res) => {
    databaseApi.GetSingleData(User, req.params.id, (user, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(user);
    });
};

const createNewUser = (req, res) => {
    databaseApi.PostData(User, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
}

const updateUser = (req, res) => {
    databaseApi.UpdateData(User, req, (error, data) => {
        if (error) res.status(500).json(error);
        res.json(data);
    })
}

const deleteUser = (req, res) => {
    databaseApi.DeleteData(User, req, (error, data) => {
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