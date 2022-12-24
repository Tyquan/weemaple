var express = require('express');
var router = express.Router();
const Gig = require('../Models/Gig');
const Contact = require('../Models/ContactMessage');
const Training = require('../Models/Training');


// USERS ROUTES
router.get('/dashboard', (req, res, next) => {
  res.render('users/dashboard');
});

router.get('/usertrainings', (req, res, next) => {
  Training.find().then(data => {
    let trainings = data.sort((a, b) => {
      return b.creationDate - a.creationDate;
    });
    res.render('users/training/trainings', {trainings: trainings});
  }).catch(err => { throw err; });
});

router.get('/createTraining', (req, res, next) => {
  res.render('users/training/createTraining');
});

router.post('/createTraining', (req, res, next) => {
  let newTraining = new Training(req.body);
  newTraining.save().then(() => {
    res.redirect('usertrainings');
  }).catch(err => { throw err; });
});

router.get('/usergigs', (req, res, next) => {
  // console.log("Gigs User Session:", String(session.userId));
  // let gigs = [];
  Gig.find().then(data => {
    let gigs = data.sort((a, b) => {
      return b.creationDate - a.creationDate;
    });
    res.render('users/gigs', { gigs: gigs });
  }).catch(err => {throw err;})
});

router.get('/createGig', (req, res, next) => {
  res.render('users/createGig');
});

router.post('/createGig', (req, res) => {
  let newGig = new Gig(req.body);
  newGig.save()
    .then(() => {
      res.redirect('usergigs');
    })
    .catch(err => {throw err;});
});

router.post('/deleteGig', (req, res) => {
  let gigId = req.body._id;
  Gig.findByIdAndDelete(gigId).then(() => {
    res.redirect('usergigs');
  }).catch((err) => {
    throw err;
  });
});

router.get('/editGig/:id', (req, res) => {
  Gig.findById(req.params.id).then((data) => {
    res.render('users/editGig', {
      gig: data
    })
  }).catch(err => {
    throw err
  });
});

router.post('/editGig', async (req, res) => {
  const filter = req.params.id;
  const updateDocument = {
    $set: {
      title: req.body.title,
      companyName: req.body.companyName,
      compensation: req.body.compensation,
      payPeriod: req.body.payPeriod,
      website: req.body.website,
      facebookUrl: req.body.url,
      twitterUrl: req.body.twitterUrl,
      instagramUrl: req.body.instagramUrl,
      address: req.body.address,
      city: req.body.city,
      stateLink: req.body.stateLink,
      zipcode: req.body.zipcode,
      travelType: req.body.travelType,
      category: req.body.category,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      description: req.body.description
    }
  };
  const result = await Gig.updateOne(filter, updateDocument);
  res.redirect('usergigs');
});

router.post('/apply', (req, res) => {
  Gig.findById(req.body._id).then((data) => {
    data.applicants.push(req.body);
    data.save().then(() => {
      res.redirect('/applySuccess');
    }).catch(err => {
      throw err;
    });
  }).catch(err => {
    throw err;
  });
})

router.get('/applySuccess', (req, res) => {
  res.render('static/gigs/applySuccess');
})

router.post('/contact', (req, res) => {
  let message = new Contact(req.body);
  message.save().then(() => {
    res.redirect('messageSuccess');
  }).catch((err) => {
    res.render('about-us', {message: "Unable To Send The Message. Please Try Again..."});
  });
});

router.get('/messageSuccess', (req, res) => {
  res.render('static/messageSuccess');
})

router.get('/applicants/:id', (req, res) => {
  Gig.findById(req.params.id).then((data) => {
    res.render('users/applicants', {
      gig: data
    })
  }).catch(err => {
    throw err
  });
});

router.get('/applicant/:id', (req, res) => {
  Gig.findById(req.params.id).then((data) => {
    res.render('users/applicants', {
      gig: data
    })
  }).catch(err => {
    throw err
  });
});

module.exports = router;