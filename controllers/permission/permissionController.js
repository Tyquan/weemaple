const databaseApi = require("../databaseApi/databaseApi");
const PermissionModel = require('./Permission');

const getPermissions = (req, res) => {
    databaseApi.GetData(PermissionModel, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    })
};

const getSinglePermission = (req, res) => {
    databaseApi.GetSingleData(PermissionModel, req.params.id, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    });
};

const createNewPermission = (req, res) => {
    databaseApi.PostData(PermissionModel, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updatePermission = (req, res) => {
    databaseApi.UpdateData(PermissionModel, req, req.body, (data) => {
        res.json(data);
    })
};

const deletePermission = (req, res) => {
    databaseApi.DeleteData(PermissionModel, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getPermissions,
    createNewPermission,
    getSinglePermission,
    updatePermission,
    deletePermission
};