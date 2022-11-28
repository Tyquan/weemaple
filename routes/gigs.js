const express = require('express');
const router = express.Router();
const Gig = require('../Models/Gig');

router.get('/', (req, res, next) => {
    Gig.find().then((data) => {
        res.render('static/gigs/gigs', { gigs: data});
    }).catch((err) => {
        res.render('404', {
            message: err
        })
    });
})

module.exports = router;