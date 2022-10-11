const express = require('express');
const contactMessageApi = express.Router();
// const contactMessage = require('../controllers/contactMessageController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

const databaseApi = require('../controllers/databaseApi/databaseApi');
const ContactMessage = require('../models/ContactMessage');

const getContactMessage = (req, res) => {
    databaseApi.GetData(ContactMessage, (contactMessages, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(contactMessages);
    });
}

const getSingleContactMessage = (req, res) => {
    databaseApi.GetSingleData(ContactMessage, req.params.id, (contactMessage, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(contactMessage);
    });
};

const createNewContactMessage = (req, res) => {
    databaseApi.PostData(ContactMessage, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
}

const updateContactMessage = (req, res) => {
    databaseApi.UpdateData(ContactMessage, req, req.body, (data) => {
        res.json(data);
    })
}

const deleteContactMessage = (req, res) => {
    databaseApi.DeleteData(ContactMessage, req, (data) => {
        res.json(data);
    })
}

contactMessageApi.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), getContactMessage)
    .post(createNewContactMessage)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), updateContactMessage)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), deleteContactMessage);
contactMessageApi.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), getSingleContactMessage);

module.exports = contactMessageApi;

// contactMessageApi.route('/')
//     .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.getContactMessage)
//     .post(contactMessage.createNewContactMessage)
//     .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.updateContactMessage)
//     .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.deleteContactMessage);
// contactMessageApi.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee), contactMessage.getSingleContactMessage);

// module.exports = contactMessageApi;