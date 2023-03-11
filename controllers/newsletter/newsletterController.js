const databaseApi = require("../databaseApi/databaseApi");
const Newsletter = require('./Newsletter');

const getNewsletters = (req, res) => {
    databaseApi.GetData(Newsletter, (newsletters, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(newsletters);
    })
};

const getSingleNewsletter = (req, res) => {
    databaseApi.GetSingleData(Newsletter, req.params.id, (newsletter, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(newsletter);
    });
};

const createNewNewsletter = (req, res) => {
    databaseApi.PostData(Newsletter, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updateNewsletter = (req, res) => {
    databaseApi.UpdateData(Newsletter, req, req.body, (data) => {
        res.json(data);
    })
};

const deleteNewsletter = (req, res) => {
    databaseApi.DeleteData(Newsletter, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getNewsletters,
    createNewNewsletter,
    getSingleNewsletter,
    updateNewsletter,
    deleteNewsletter
};