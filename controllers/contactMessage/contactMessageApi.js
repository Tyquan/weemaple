const express = require('express');
const contactMessageApi = express.Router();
const contactMessage = require('./contactMessageController');

contactMessageApi.route('/')
    .get(contactMessage.getContactMessage)
    .post(contactMessage.createNewContactMessage)
    .put(contactMessage.updateContactMessage)
    .delete(contactMessage.deleteContactMessage);
contactMessageApi.route('/:id')
    .get(contactMessage.getSingleContactMessage);

module.exports = contactMessageApi;