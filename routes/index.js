const express = require('express');
const Gig = require('../Models/Gig');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const Contact = require('../Models/ContactMessage');
const router = express.Router();

let session;

/* GET home page. */
router.get('/', async (req, res, next) => {
  session = req.session;
  if (session.userId)
  {
    res.send("Welcome User <a href=\'/auth/logout'>click to logout</a>")
  } else {
    // try {
    //   const { page = 1, limit = 10 } = req.query;
    //   const gigs = await Gig.find()
    //     .sort((a,b) => {
    //         return b.creationDate - a.creationDate;
    //     })
    //     .limit(limit * 1)
    //     .skip((page - 1) * limit)
    //     .exec();

    //   const count = await Gig.count();

    //   res.render('index', { 
    //     title: 'Weemaple - Jobs and Gigs Search | weemaple.com', 
    //     message: "", 
    //     gigs,
    //     totalPages: Math.ceil(count / limit),
    //     currentPage: page
    //   });
    // }
    // catch(err) {
    //   throw err;
    // }
    
    Gig.find().then(data => {
      let sortedGigs = data.sort((a,b) => {
        return b.creationDate - a.creationDate;
      })
      res.render('index', { 
        title: 'Weemaple - Jobs and Gigs Search | weemaple.com', 
        message: "", 
        gigs: sortedGigs
      });
    }).catch(err => {throw err});
  }
  
});

router.get('/singleGig/:id', (req, res, next) => {
  Gig.findById(req.params.id).then(data => {
    res.render('static/gigs/singleGig', { title: "Weemaple - " + data.title + " hiring now", gig: data });
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

  console.log("New User", req.body);
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
      res.status(500).json({ 'message': err.message });
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
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email }).exec();
  bcrypt.compare(password, foundUser.password, (err, result) => {
      if (err) throw err;
      if (result) {
          session = req.session;
          session.userId = foundUser._id;
          res.redirect('usergigs');
      } else {
          res.send('Invalid username or password');
      }
  });
});


// USERS ROUTES
router.get('/dashboard', (req, res, next) => {
  res.render('users/dashboard');
});

router.get('/usergigs', (req, res, next) => {
  console.log("Gigs User Session:", String(session.userId));
  // let gigs = [];
  Gig.find().then(data => {
    let gigs = data.filter((gig) => {
      return gig.userId === String(session.userId);
    }).sort((a, b) => {
      return b.creationDate - a.creationDate;
    });
    res.render('users/gigs', { gigs: gigs });
  }).catch(err => {throw err;})
});

router.get('/createGig', (req, res, next) => {
  console.log("SESSION ID", session);
  res.render('users/createGig');
});

router.post('/createGig', (req, res) => {
  let newGig = new Gig(req.body);
  newGig.userId = session.userId;
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

router.post('/editGig', (req, res) => {
  Gig.findByIdAndUpdate(req.params.id).then(() => {
    res.redirect('usergigs');
  }).catch(err => {
    throw err;
  });
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