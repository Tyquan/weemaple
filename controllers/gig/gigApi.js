const express = require('express');
const GigApi = express.Router();
const ROLES_LIST = require('../../Config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const gigController = require('./gigController');

GigApi.route('/')
    .get(gigController.getGigs)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), gigController.createNewGig)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), gigController.updateGig)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), gigController.deleteGig);

GigApi.route('/:id')
    .get(gigController.getSingleGig);

module.exports = GigApi;