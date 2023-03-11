const databaseApi = require("../databaseApi/databaseApi");
const EmailSubscriber = require('./EmailSubscriber');

const getEmailSubscribers = (req, res) => {
    databaseApi.GetData(EmailSubscriber, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    })
};

const getSingleEmailSubscriber = (req, res) => {
    databaseApi.GetSingleData(EmailSubscriber, req.params.id, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    });
};

const createNewEmailSubscriber = (req, res) => {
    databaseApi.PostData(EmailSubscriber, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updateEmailSubscriber = (req, res) => {
    databaseApi.UpdateData(EmailSubscriber, req, req.body, (data) => {
        res.json(data);
    })
};

const deleteEmailSubscriber = (req, res) => {
    databaseApi.DeleteData(EmailSubscriber, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getEmailSubscribers,
    createNewEmailSubscriber,
    getSingleEmailSubscriber,
    updateEmailSubscriber,
    deleteEmailSubscriber
};