const databaseApi = require("../databaseApi/databaseApi");
const organizationMeta = require('./OrganizationMeta');

const getOrganizationMetas = (req, res) => {
    databaseApi.GetData(organizationMeta, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    })
};

const getSingleOrganizationMeta = (req, res) => {
    databaseApi.GetSingleData(organizationMeta, req.params.id, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    });
};

const createNewOrganizationMeta = (req, res) => {
    databaseApi.PostData(organizationMeta, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updateOrganizationMeta = (req, res) => {
    databaseApi.UpdateData(organizationMeta, req, req.body, (data) => {
        res.json(data);
    })
};

const deleteOrganizationMeta = (req, res) => {
    databaseApi.DeleteData(organizationMeta, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getOrganizationMetas,
    createNewOrganizationMeta,
    getSingleOrganizationMeta,
    updateOrganizationMeta,
    deleteOrganizationMeta
};