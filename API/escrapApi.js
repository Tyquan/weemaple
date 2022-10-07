const express = require('express');
const EscrapApi = express.Router();
const escrapController = require('../controllers/escrapController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

EscrapApi.route('/')
    .get(escrapController.getEscraps)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), escrapController.createNewEscrap)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), escrapController.updateEscrap)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), escrapController.deleteEscrap);

EscrapApi.route('/:id')
    .get(escrapController.getSingleEscrap);

module.exports = EscrapApi;