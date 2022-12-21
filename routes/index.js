const express = require('express');
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Gig = require('../Models/Gig');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const Contact = require('../Models/ContactMessage');
const Training = require('../Models/Training');
const router = express.Router();

let session;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  

  return { limit, offset, sort: {creationDate: 'desc'} };
};

/* GET home page. */
router.get('/', async (req, res, next) => {
  session = req.session;
  const { page, size, title } = req.query;
    let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

    const { limit, offset, sort } = getPagination(page, size); 
    Gig.paginate(condition, {offset, limit, sort})
    .then((dat) => {
      console.log("data", dat);
      dat.docs.sort((a, b) => {
        return b.creationDate - a.creationDate;
      })
      res.render('index', { 
        title: 'Weemaple - Jobs and Gigs Search | weemaple.com', 
        totalItems: dat.totalDocs,
        gigs: dat.docs,
        totalPages: dat.totalPages,
        currentPage: dat.page,
        nextPage: dat.nextPage,
        prevPage: dat.prevPage,
        hasNextPage: dat.hasNextPage,
        hasPrevPage: dat.hasPrevPage,
        message: ""
      })
      
    }).catch(err => { throw err; })
  
});

router.get('/singleGig/:id', (req, res, next) => {
  Gig.findById(req.params.id).then(data => {
    res.render('static/gigs/singleGig', { title: "Weemaple - " + data.title + " hiring now", gig: data });
  }).catch(err => { throw err; });
});

// Training Page
router.get('/training', (req, res, next) => {
  // res.render('/static/training/trainings');
  session = req.session;
  const { page, size, title } = req.query;
    let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

    const { limit, offset, sort } = getPagination(page, size); 
    Training.paginate(condition, {offset, limit, sort})
    .then((dat) => {
      console.log("data", dat);
      dat.docs.sort((a, b) => {
        return b.creationDate - a.creationDate;
      })

      res.render('static/training/trainings', {
        title: 'Weemaple - Jobs and Gigs Search | weemaple.com | Training', 
        totalItems: dat.totalDocs,
        trainings: dat.docs,
        totalPages: dat.totalPages,
        currentPage: dat.page,
        nextPage: dat.nextPage,
        prevPage: dat.prevPage,
        hasNextPage: dat.hasNextPage,
        hasPrevPage: dat.hasPrevPage,
        message: ""
      })
    });
});

router.post('/searchtrainings', (req, res, next) => {
  let { category } = req.body;
  Training.find().then(data => {
    const filteredTrainings = data.filter(training => {
      return gig.category.includes(category);
    }).sort((a,b) => {
      return b.creationDate - a.creationDate;
    });
    res.render('static/training/searchResults', {
      trainings: filteredTrainings,
      title: "Weemaple - Training Search Category: " + category + " | weemaple.com"
    })
  }).catch((err) => {
    throw err;
  });
});

router.get('/singletraining/:id', (req, res, next) => {
  Training.findById(req.params.id).then(data => {
    res.render('static/training/singleTraining', { 
      title: "Weemaple - " + data.title + " training", 
      training: data 
    });
  }).catch(err => { throw err; });
});

router.post('/search', (req, res, next) => {
  console.log("Search Request", req.body);
  let { jobType } = req.body;
  jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1);
  Gig.find().then(data => {
    const filteredGigs = data.filter(gig => {
      return gig.title.includes(jobType);
    }).sort((a,b) => {
      return b.creationDate - a.creationDate;
    });
    res.render('static/gigs/searchResults', {
      gigs: filteredGigs, title: "Weemaple - Job Search Category: " + jobType + " | weemaple.com"
    });
  }).catch(err => {
    throw err;
  });
});

router.get('/weegigs', function(req, res, next) {
  res.render('static/gigs/gigs', { title: 'Weemaple', message: "" });
});

router.get('/about-us', function(req, res, next) {
  res.render('static/eezy', { title: 'Weemaple', message: "" });
});

router.get('/build-with-us', (req, res) => {
  res.render('static/buildWithUs', {
    title: 'Weemaple'
  })
});


// AUTH ROUTES
// SIGNUP
router.get('/signup', (req, res) => {
  res.render('static/auth/signup', {'message': ''});
})
router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
      res.render('static/auth/signup', { 'message': 'Username and password are required.' });
  }

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) {
      res.render('static/auth/signup', { 'message': 'Email already in use. Please login.' });
  }
  try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(password, 10);

      //create and store the new user
      const result = await User.create({
          "email": email,
          "password": hashedPwd
      });

      session = req.session;
      session.userId = result._id;

      res.redirect('../users/gigs', );
  } catch (err) {
    res.render('static/auth/signup', { 'message': 'Unable to signup please try again' });
  }
});

// LOGOUT
router.get('/logout', (req, res, next) => {
  req.session = null;
  session = null;
  res.redirect('/');
  
});

// LOGIN
router.get('/login', (req, res, next) => {
  res.render('static/auth/login')
});

router.post('/login', async(req, res, next) => {
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  if (!foundUser) {
    res.render('static/auth/login', {message: 'Invalid username or password'});
  } else {
    bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
      if (err) throw err;
      if (result) {
        session = req.session;
        session.userId = foundUser._id;
        res.redirect('usergigs');
      } else {
        res.render('static/auth/login', {message: 'Unable to sign up. Please try again...'});
      }
    });
  }
  
});


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
  // console.log("Request body", req.body);
  // Gig.findById(req.params.id).then(data => {
  //   data = req.body;
  //   console.log("Updated data:", data);
  //   data.save().then(() => {
  //     res.redirect('usergigs');
  //   }).catch(err => {throw err;});
  // }).catch(err => {throw err;});
  // Gig.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
  //   if (!err) {
  //     res.redirect('usergigs');
  //   } else {
  //     throw err;
  //   }
  // });
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