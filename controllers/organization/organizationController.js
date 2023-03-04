const databaseApi = require("../databaseApi/databaseApi");
const organizationModel = require('./organizationModel');

const getOrganizations = (req, res) => {
    databaseApi.GetData(organizationModel, (organizations, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(organizations);
    })
};

const getSingleOrganization = (req, res) => {
    databaseApi.GetSingleData(organizationModel, req.params.id, (organization, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(organization);
    });
};

const createNewOrganization = (req, res) => {
    databaseApi.PostData(organizationModel, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updateOrganization = (req, res) => {
    databaseApi.UpdateData(organizationModel, req, req.body, (data) => {
        res.json(data);
    })
};

const deleteOrganization = (req, res) => {
    databaseApi.DeleteData(organizationModel, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getOrganizations,
    createNewOrganization,
    getSingleOrganization,
    updateOrganization,
    deleteOrganization
};