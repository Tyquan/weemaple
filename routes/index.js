const express = require('express');
const router = express.Router();
// const Gig = require('../models/Gig');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weemaple', message: "" });
});

// router.get('/eezy', function(req, res, next) {
//   res.render('static/eezy');
// });

// /* Dynamic Pages */

// //Gigs
// router.get('/gigs', function(req, res, next) {
//   Gig.find().then((data) => {
//     res.render('static/gigs/gigs', {gigs: data});
//   }).catch((err) => {
//     console.log(err);
//   });
// });
// router.get('/gig/:id', (req, res, next) => {
//   Gig.findById(req.params.id).then((data) => {
//     res.render('static/gigs/gig', {gig: data});
//   }).catch((err) => {
//     console.log(err);
//   });
// });

// //Articles
// router.get('/articles', function(req, res, next) {
//   res.render('static/articles/articles');
// });

module.exports = router;
