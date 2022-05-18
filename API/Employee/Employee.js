const express = require('express');
const Database = require('../../Config/Database');
const Employee = require('../../Models/Employee');
const Authentication = require('../../Config/Authentication');
const EmployeeApi = express.Router();

EmployeeApi.get('/', (req, res) => {
    Database.GetData(Employee, (employees) => {
        console.log("Employee GET:", employees);
        res.status(200).json(employees);
    });
});

EmployeeApi.get('/:id', async (req, res) => {
    try {
        let employee = await Database.GetSingleData(Employee, req.params.id);
        res.status(200).json(employee);
    } catch (error) {
        console.log("Error Getting employee data: ", error);
        res.status(500).json(error);
    }
    
});

EmployeeApi.post('/', (req, res) => {
    Authentication.signupEmployee(req, (data) => {
        res.status(200).json(data);
    });
    // Database.PostData(Employee, req, (data) => {
    //     console.log(data);
    //     res.json(data);
    // });
});

EmployeeApi.post('/login', (req, res) => {
    Authentication.loginEmployee(req, (data) => {
        console.log("BACKEND DATA:", data);
        res.json(data);
    });
});

EmployeeApi.put('/:id', (req, res) => {
    Database.UpdateData(Employee, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

EmployeeApi.delete('/:id', (req, res) => {
    Database.DeleteData(Employee, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = EmployeeApi;