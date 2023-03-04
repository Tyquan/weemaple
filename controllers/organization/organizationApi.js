const express = require('express');
const organizationApi = express.Router();
const organizationController = require('./organizationController');

organizationApi.route('/')
    .get(organizationController.getOrganizations)
    .post(organizationController.createNewOrganization)
    .put(organizationController.updateOrganization)
    .delete(organizationController.deleteOrganization);
organizationApi.route('/:id')
    .get(organizationController.getSingleOrganization);


module.exports = organizationApi;