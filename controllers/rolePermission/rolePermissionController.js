const databaseApi = require("../databaseApi/databaseApi");
const RolePermissionModel = require('./RolePermission');

const getRolePermissions = (req, res) => {
    databaseApi.GetData(RolePermissionModel, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    })
};

const getSingleRolePermission = (req, res) => {
    databaseApi.GetSingleData(RolePermissionModel, req.params.id, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    });
};

const createNewRolePermission = (req, res) => {
    databaseApi.PostData(RolePermissionModel, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updateRolePermission = (req, res) => {
    databaseApi.UpdateData(RolePermissionModel, req, req.body, (data) => {
        res.json(data);
    })
};

const deleteRolePermission = (req, res) => {
    databaseApi.DeleteData(RolePermissionModel, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getRolePermissions,
    createNewRolePermission,
    getSingleRolePermission,
    updateRolePermission,
    deleteRolePermission
};