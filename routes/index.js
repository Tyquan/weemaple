const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weemaple', message: "" });
});

router.get('/weegigs', function(req, res, next) {
  res.render('static/gigs/gigs', { title: 'Weemaple - Wee Gigs', message: "" });
});

router.get('/eezypeezyprint', function(req, res, next) {
  res.render('static/eezy', { title: 'Weemaple - Eezy Peezy Print', message: "" });
});

module.exports = router;
