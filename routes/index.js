const express = require('express');
const Gig = require('../Models/Gig');
const Training = require('../Models/Training');
const router = express.Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  

  return { limit, offset, sort: {creationDate: 'desc'} };
};

/* GET home page. */
router.get('/', async (req, res, next) => {
  
  const { page, size, title } = req.query;
  
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" }} : {};
  
  const { limit, offset, sort } = getPagination(page, size);
  
  try {
    let gig = await Gig.paginate(condition, {offset, limit, sort});
    
    gig.docs.sort((a, b) => {
      return b.creationDate - a.creationDate;
    });

    res.render('index', { 
      title: 'Weemaple - Jobs and Gigs Search | weemaple.com', 
      totalItems: gig.totalDocs,
      gigs: gig.docs,
      totalPages: gig.totalPages,
      currentPage: gig.page,
      nextPage: gig.nextPage,
      prevPage: gig.prevPage,
      hasNextPage: gig.hasNextPage,
      hasPrevPage: gig.hasPrevPage,
      message: ""
    });

  } catch (error) {
    res.render('404', {
      title: "Weemaple - Error Page", 
      error: error
    });
  }
  
});

router.post('/search', async (req, res, next) => {
  let { jobType } = req.body;
  jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1);
  
  try {
    let gigs = await Gig.find();

    const filteredGigs = gigs.filter(gig => {
      return gig.title.includes(jobType);
    }).sort((a,b) => {
      return b.creationDate - a.creationDate;
    });

    res.render('static/gigs/searchResults', {
      gigs: filteredGigs, title: "Weemaple - Job Search Category: " + jobType + " | weemaple.com"
    });

  } catch (error) {
    res.render('404', {
      title: "Weemaple - Error Page", 
      error: error
    });
  }
  
});

router.get('/singleGig/:id', async (req, res, next) => {
  try {
    let gig = await Gig.findById(req.params.id);

    gig.viewCount += 1;
    
    await gig.save();

    res.render('static/gigs/singleGig', { title: "Weemaple - " + gig.title + " hiring now", gig: gig });

  } catch (error) {
    res.render('404', {
      title: "Weemaple - Error Page", 
      error: error
    });
  }
  
});

// Training Page
router.get('/training', async (req, res, next) => {
  const { page, size, title } = req.query;
  
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  const { limit, offset, sort } = getPagination(page, size); 

  try {
    let training = await Training.paginate(condition, {offset, limit, sort});

    training.sort((a, b) => {
      return b.creationDate - a.creationDate;
    });

    res.render('static/training/trainings', {
      title: 'Weemaple - Jobs and Gigs Search | weemaple.com | Training', 
      totalItems: training.totalDocs,
      trainings: training.docs,
      totalPages: training.totalPages,
      currentPage: training.page,
      nextPage: training.nextPage,
      prevPage: training.prevPage,
      hasNextPage: training.hasNextPage,
      hasPrevPage: training.hasPrevPage,
      message: ""
    });

  } catch (error) {
    throw error;
  }
});

router.post('/searchtrainings', async (req, res, next) => {
  let { category } = req.body;
  try {
    let trainings = await Training.find();

    const filteredTrainings = trainings.filter(training => {
      return training.category.includes(category);
    }).sort((a,b) => {
      return b.creationDate - a.creationDate;
    });

    res.render('static/training/searchResults', {
      trainings: filteredTrainings,
      title: "Weemaple - Training Search Category: " + category + " | weemaple.com"
    })

  } catch (error) {
    throw err;
  }
});

router.get('/singletraining/:id', async (req, res, next) => {
  try {

    let training = await Training.findById(req.params.id);

    training.viewCount += 1;
    
    await training.save();

    res.render('static/training/singleTraining', { 
      title: "Weemaple - " + training.title + " training", 
      training: training
    });
  } catch(error) {
    throw error;
  }
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

module.exports = router;