const databaseApi = require("../databaseApi/databaseApi");
const EmployeeModel = require('./Employee');

const getEmployees = (req, res) => {
    databaseApi.GetData(EmployeeModel, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    })
};

const getSingleEmployee = (req, res) => {
    databaseApi.GetSingleData(EmployeeModel, req.params.id, (data, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(data);
    });
};

const createNewEmployee = (req, res) => {
    databaseApi.PostData(EmployeeModel, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
};

const updateEmployee = (req, res) => {
    databaseApi.UpdateData(EmployeeModel, req, req.body, (data) => {
        res.json(data);
    })
};

const deleteEmployee = (req, res) => {
    databaseApi.DeleteData(EmployeeModel, req, (data) => {
        res.json(data);
    })
};

module.exports = {
    getEmployees,
    createNewEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
};