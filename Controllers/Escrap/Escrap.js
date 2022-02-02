const express = require('express');
const Database = require('../../Config/Database');
const Escrap = require('../../Models/Escrap');
const EscrapApi = express.Router();

EscrapApi.get('/', (req, res) => {
    Database.GetData(Escrap, (escraps, error) => {
        if (error) res.status(500).json(error);
        console.log("Escraps GET:", escraps)
        res.status(200).json(escraps);
    });
});

EscrapApi.get('/:id', (req, res) => {
    Database.GetSingleData(Escrap, req.params.id, (escrap, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(escrap);
    });
});

EscrapApi.post('/', (req, res) => {
    Database.PostData(Escrap, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
});

EscrapApi.put('/:id', (req, res) => {
    Database.UpdateData(Escrap, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

EscrapApi.delete('/:id', (req, res) => {
    Database.DeleteData(Escrap, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = EscrapApi;