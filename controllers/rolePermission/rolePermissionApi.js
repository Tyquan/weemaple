const express = require('express');
const rolePermissionApi = express.Router();
const rolePermissionController = require('./rolePermissionController');

rolePermissionApi.route('/')
    .get(rolePermissionController.getRolePermissions)
    .post(rolePermissionController.createNewRolePermission)
    .put(rolePermissionController.updateRolePermission)
    .delete(rolePermissionController.deleteRolePermission);
rolePermissionApi.route('/:id')
    .get(rolePermissionController.getSingleRolePermission);


module.exports = rolePermissionApi;