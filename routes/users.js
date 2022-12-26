var express = require('express');
var router = express.Router();
const Gig = require('../Models/Gig');
const Contact = require('../Models/ContactMessage');
const Training = require('../Models/Training');
const { findByIdAndDelete } = require('../Models/Gig');

function sortByDate (data) {
  return data.sort((a, b) => {
    return b.creationDate - a.creationDate;
  });
}

function sortByViewCount(data) {
  return data.sort((a, b) => {
    return b.viewCount - a.viewCount;
  });
}

// USERS ROUTES
router.get('/dashboard', async (req, res, next) => {
  try {
    let trainings = await Training.find();
    let gigs = await Training.find();
    console.log("trainings", trainings);
    console.log("gigs", gigs);
    // let sortedTrainings = sortByViewCount(trainings);
    // let sortedGigs = sortByViewCount(gigs);
    res.render('users/dashboard', {
      trainings: trainings,
      gigs: gigs
    });
  } catch (error) {
    throw error;
  }
});

router.get('/usertrainings', async (req, res, next) => {
  try {
    let trainings = await Training.find();
    let filteredTrainings = sortByDate(trainings);
    res.render('users/training/trainings', {
      trainings: filteredTrainings
    });
  } catch (error) {
    throw error;
  }
});

router.get('/createTraining', (req, res, next) => {
  res.render('users/training/createTraining');
});

router.post('/createTraining', async (req, res, next) => {
  try {
    let newTraining = new Training(req.body);
    await newTraining.save();
    res.redirect('usertrainings');
  } catch (error) {
    throw error;
  }
});

router.get('/usergigs', async (req, res, next) => {
  try {
    let gigs = await Gig.find();
    let sortedGigs = sortByDate(gigs);
    res.render('users/gigs', { gigs: sortedGigs });
  } catch (error) {
    throw error;
  }
});

router.get('/createGig', (req, res, next) => {
  res.render('users/createGig');
});

router.post('/createGig', async (req, res) => {
  try {
    let newGig = new Gig(req.body);
    await newGig.save();
    res.redirect('usergigs');
  } catch (error) {
    throw error;
  }
});

router.post('/deleteGig', async (req, res) => {
  try {
    let gigId = req.body._id;
    await findByIdAndDelete(gigId);
    res.redirect('usergigs');
  } catch (error) {
    throw error;
  }
});

router.get('/editGig/:id', async (req, res) => {
  try {
    let gig = await Gig.findById(req.params.id);
    res.render('users/editGig', {
      gig: gig
    })
  } catch (error) {
    throw error;
  }
});

router.post('/editGig', async (req, res) => {
  try {
    let gig = await Gig.findById(req.params.id);
    gig = req.body;
    await gig.save(); 
    res.redirect('usergigs');
  } catch(error) {
    throw error;
  }
});


router.post('/contact', async (req, res) => {
  try {
    let message = new Contact(req.body);
    await message.save();
    res.redirect('messageSuccess');
  } catch (error) {
    res.render('about-us', {message: "Unable To Send The Message. Please Try Again..."});
  }
});

module.exports = router;