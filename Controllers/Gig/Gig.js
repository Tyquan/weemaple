const express = require('express');
const Database = require('../../Config/Database');
const Gig = require('../../Models/Gig');
const GigApi = express.Router();

GigApi.get('/', (req, res) => {
    Database.GetData(Gig, (gigs, error) => {
        if (error) res.status(500).json(error);
        console.log("Gigs GET:", gigs)
        res.status(200).json(gigs);
    });
});

GigApi.get('/:id', (req, res) => {
    Database.GetSingleData(Gig, req.params.id, (gig, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(gig);
    });
});

GigApi.post('/', (req, res) => {
    Database.PostData(Gig, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
});

GigApi.put('/:id', (req, res) => {
    Database.UpdateData(Gig, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

GigApi.delete('/:id', (req, res) => {
    Database.DeleteData(Gig, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = GigApi;