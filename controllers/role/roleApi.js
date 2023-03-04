const express = require('express');
const roleApi = express.Router();
const roleController = require('./roleController');

roleApi.route('/')
    .get(roleController.getRoles)
    .post(roleController.createNewRole)
    .put(roleController.updateRole)
    .delete(roleController.deleteRole);
roleApi.route('/:id')
    .get(roleController.getSingleRole);


module.exports = roleApi;