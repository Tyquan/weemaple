const express = require('express');
const router = express.Router();
const logoutController = require('./logoutController');

router.post('/', logoutController.handleLogout);

module.exports = router;