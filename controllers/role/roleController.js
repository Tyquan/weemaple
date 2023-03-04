const databaseApi = require("../databaseApi/databaseApi");
const RoleModel = require('./Role');

const getRoles = (req, res) => {
    databaseApi.GetData(RoleModel, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    })
};

const getSingleRole = (req, res) => {
    databaseApi.GetSingleData(RoleModel, req.params.id, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    });
};

const createNewRole = (req, res) => {
    databaseApi.PostData(RoleModel, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updateRole = (req, res) => {
    databaseApi.UpdateData(RoleModel, req, req.body, (data) => {
        res.json(data);
    })
};

const deleteRole = (req, res) => {
    databaseApi.DeleteData(RoleModel, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getRoles,
    createNewRole,
    getSingleRole,
    updateRole,
    deleteRole
};