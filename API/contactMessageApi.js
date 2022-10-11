const express = require('express');
const contactMessageApi = express.Router();
const contactMessage = require('../controllers/contactMessageController');
const ROLES_LIST = require('../Config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles');

contactMessageApi.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.getContactMessage)
    .post(contactMessage.createNewContactMessage)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.updateContactMessage)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.deleteContactMessage);
contactMessageApi.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.getSingleContactMessage);

module.exports = contactMessageApi;