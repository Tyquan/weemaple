const databaseApi = require('../databaseApi/databaseApi');
const Gig = require('./Gig');

const getGigs = (req, res) => {
    databaseApi.GetData(Gig, (gigs, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(gigs);
    });
};

const getSingleGig = (req, res) => {
    databaseApi.GetSingleData(Gig, req.params.id, (gig, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(gig);
    });
};

const createNewGig = (req, res) => {
    databaseApi.PostData(Gig, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
}

const updateGig = (req, res) => {
    databaseApi.UpdateData(Gig, req, (data) => {
        res.json(data);
    })
};

const deleteGig = (req, res) => {
    databaseApi.DeleteData(Gig, req, (data) => {
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