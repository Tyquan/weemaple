const express = require('express');
const newsletterApi = express.Router();
const newsletterController = require('./newsletterController');

newsletterApi.route('/')
    .get(newsletterController.getNewsletters)
    .post(newsletterController.createNewNewsletter)
    .put(newsletterController.updateNewsletter)
    .delete(newsletterController.deleteNewsletter);
newsletterApi.route('/:id')
    .get(newsletterController.getSingleNewsletter);


module.exports = newsletterApi;