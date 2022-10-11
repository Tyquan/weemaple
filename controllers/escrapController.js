const databaseApi = require('./databaseApi/databaseApi');
const Escrap = require('../models/Escrap');

const getEscraps = (req, res) => {
    databaseApi.GetData(Escrap, (err, scraps) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scraps);
    });
};

const getSingleEscrap = (req, res) => {
    databaseApi.GetSingleData(Escrap, req.params.id, (err, scrap) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scrap);
    })
};

const createNewEscrap = (req, res) => {
    databaseApi.PostData(Escrap, req, (err, scrap) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scrap);
    })
};

const updateEscrap = (req, res) => {
    databaseApi.UpdateData(Escrap, req, (err, scrap) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scrap);
    })
};

const deleteEscrap = (req, res) => {
    databaseApi.DeleteData(Escrap, req, (err, scrap) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scrap)
    })
};


module.exports = {
    getEscraps,
    getSingleEscrap,
    createNewEscrap,
    updateEscrap,
    deleteEscrap
}