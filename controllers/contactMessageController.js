const Database = require('../config/Database');
const ContactMessage = require('../models/ContactMessage');

const getContactMessage = (req, res) => {
    Database.GetData(ContactMessage, (contactMessages, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(contactMessages);
    });
}

const getSingleContactMessage = (req, res) => {
    Database.GetSingleData(ContactMessage, req.params.id, (contactMessage, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(contactMessage);
    });
};

const createNewContactMessage = (req, res) => {
    Database.PostData(ContactMessage, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
}

const updateContactMessage = (req, res) => {
    Database.UpdateData(ContactMessage, req, req.body, (data) => {
        res.json(data);
    })
}

const deleteContactMessage = (req, res) => {
    Database.DeleteData(ContactMessage, req, (data) => {
        res.json(data);
    })
}

module.exports = {
    getContactMessage,
    getSingleContactMessage,
    createNewContactMessage,
    updateContactMessage,
    deleteContactMessage
};