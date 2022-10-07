const Database = require('../config/Database');
const Gig = require('../models/Gig');

const getGigs = (req, res) => {
    Database.GetData(Gig, (gigs, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(gigs);
    });
};

const getSingleGig = (req, res) => {
    Database.GetSingleData(Gig, req.params.id, (gig, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(gig);
    });
};

const createNewGig = (req, res) => {
    Database.PostData(Gig, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
}

const updateGig = (req, res) => {
    Database.UpdateData(Gig, req, (data) => {
        res.json(data);
    })
};

const deleteGig = (req, res) => {
    Database.DeleteData(Gig, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getGigs,
    getSingleGig,
    createNewGig,
    updateGig,
    deleteGig
}