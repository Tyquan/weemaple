const express = require('express');
const Database = require('../../Config/Database');
const ContactMessage = require('../../Models/ContactMessage');
const ContactMessageApi = express.Router();

ContactMessageApi.get('/', (req, res) => {
    Database.GetData(ContactMessage, (contactMessages, error) => {
        if (error) res.status(500).json(error);
        console.log("ContactMessages GET:", contactMessages)
        res.status(200).json(contactMessages);
    });
});

ContactMessageApi.get('/:id', (req, res) => {
    Database.GetSingleData(ContactMessage, req.params.id, (contactMessage, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(contactMessage);
    });
});

ContactMessageApi.post('/', (req, res) => {
    Database.PostData(ContactMessage, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
});

// POST FROM WEEMAPLE WEBSITE
ContactMessageApi.post('/website/', (req, res) => {
    Database.PostData(ContactMessage, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.render('index', {
            message: "Contact Sent. We Will Reach You Shortly."
        });
    });
});

ContactMessageApi.put('/:id', (req, res) => {
    Database.UpdateData(ContactMessage, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

ContactMessageApi.delete('/:id', (req, res) => {
    Database.DeleteData(ContactMessage, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = ContactMessageApi;