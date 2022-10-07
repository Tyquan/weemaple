const Database = require('../config/Database');
const Escrap = require('../models/Escrap');

const getEscraps = (req, res) => {
    Database.GetData(Escrap, (err, scraps) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scraps);
    });
};

const getSingleEscrap = (req, res) => {
    Database.GetSingleData(Escrap, req.params.id, (err, scrap) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scrap);
    })
};

const createNewEscrap = (req, res) => {
    Database.PostData(Escrap, req, (err, scrap) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scrap);
    })
};

const updateEscrap = (req, res) => {
    Database.UpdateData(Escrap, req, (err, scrap) => {
        if (err) res.status(500).json(err);
        res.status(200).json(scrap);
    })
};

const deleteEscrap = (req, res) => {
    Database.DeleteData(Escrap, req, (err, scrap) => {
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