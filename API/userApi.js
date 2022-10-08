const express = require('express');
const UserApi = express.Router();
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');
const userController = require('../controllers/userController');

UserApi.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), userController.getUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), userController.createNewUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), userController.updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), userController.deleteUser);

UserApi.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), userController.getSingleUser);

module.exports = UserApi;