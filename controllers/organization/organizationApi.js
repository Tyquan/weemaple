const express = require('express');
const organizationApi = express.Router();
const organizationController = require('./organizationController');

organizationApi.route('/')
    .get(organizationController.getOrganizations)

module.exports = organizationApi;