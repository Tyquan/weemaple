const express = require('express');
const organizationMetaApi = express.Router();
const organizationMetaController = require('./organizationMetaController');

organizationMetaApi.route('/')
    .get(organizationMetaController.getOrganizationMetas)
    .post(organizationMetaController.createNewOrganizationMeta)
    .put(organizationMetaController.updateOrganizationMeta)
    .delete(organizationMetaController.deleteOrganizationMeta);
organizationMetaApi.route('/:id')
    .get(organizationMetaController.getSingleOrganizationMeta);


module.exports = organizationMetaApi;