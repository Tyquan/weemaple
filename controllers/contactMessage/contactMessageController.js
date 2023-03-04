const databaseApi = require('../databaseApi/databaseApi');
const ContactMessage = require('./ContactMessage');

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

module.exports = {
    getContactMessage,
    getSingleContactMessage,
    createNewContactMessage,
    updateContactMessage,
    deleteContactMessage
};