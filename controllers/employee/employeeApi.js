const express = require('express');
const employeeApi = express.Router();
const employeeController = require('./employeeController');

employeeApi.route('/')
    .get(employeeController.getEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);
employeeApi.route('/:id')
    .get(employeeController.getSingleEmployee);


module.exports = employeeApi;