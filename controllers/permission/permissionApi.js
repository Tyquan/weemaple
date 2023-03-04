const express = require('express');
const permissionApi = express.Router();
const permissionController = require('./permissionController');

permissionApi.route('/')
    .get(permissionController.getPermissions)
    .post(permissionController.createNewPermission)
    .put(permissionController.updatePermission)
    .delete(permissionController.deletePermission);
permissionApi.route('/:id')
    .get(permissionController.getSinglePermission);


module.exports = permissionApi;