const express = require('express');
const router = express.Router();
const loginController = require('./loginController');

router.post('/', loginController.handleLogin);

module.exports = router;