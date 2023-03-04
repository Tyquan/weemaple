const databaseApi = require("../databaseApi/databaseApi");
const organizationModel = require('./organizationModel');

const getOrganizations = (req, res) => {
    databaseApi.GetData(organizationModel, (organizations, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(organizations);
    })
};

module.exports = {
    getOrganizations
};