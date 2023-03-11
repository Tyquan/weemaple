const express = require('express');
const emailSubscriberApi = express.Router();
const emailSubscriberController = require('./emailSubscriberController');

emailSubscriberApi.route('/')
    .get(emailSubscriberController.getEmailSubscribers)
    .post(emailSubscriberController.createNewEmailSubscriber)
    .put(emailSubscriberController.updateEmailSubscriber)
    .delete(emailSubscriberController.deleteEmailSubscriber);
emailSubscriberApi.route('/:id')
    .get(emailSubscriberController.getSingleEmailSubscriber);


module.exports = emailSubscriberApi;