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
router.get('/dashboard', (req, res, next) => {
  try {
    let trainings = Training.find();
    let gigs = Training.find();
    let sortedTrainings = sortByViewCount(trainings);
    let sortedGigs = sortByViewCount(gigs);
    res.render('users/dashboard', {
      trainings: sortedTrainings,
      gigs: sortedGigs
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
  
  // const filter = req.params.id;
  // const updateDocument = {
  //   $set: {
  //     title: req.body.title,
  //     companyName: req.body.companyName,
  //     compensation: req.body.compensation,
  //     payPeriod: req.body.payPeriod,
  //     website: req.body.website,
  //     facebookUrl: req.body.url,
  //     twitterUrl: req.body.twitterUrl,
  //     instagramUrl: req.body.instagramUrl,
  //     address: req.body.address,
  //     city: req.body.city,
  //     stateLink: req.body.stateLink,
  //     zipcode: req.body.zipcode,
  //     travelType: req.body.travelType,
  //     category: req.body.category,
  //     phoneNumber: req.body.phoneNumber,
  //     email: req.body.email,
  //     description: req.body.description
  //   }
  // };
  // const result = await Gig.updateOne(filter, updateDocument);
  // res.redirect('usergigs');
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