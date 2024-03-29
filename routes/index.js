const express = require('express');
const slugify = require('slugify');
const Gig = require('../controllers/gig/Gig');
const Training = require('../controllers/training/Training');
const router = express.Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 16;
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
      message: "",
      shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
    });

  } catch (error) {
    res.render('404', {
      title: "Weemaple - Error Page", 
      error: error
    });
  }
  
});



router.post('/search', async (req, res, next) => {
  let { jobType, stateLink } = req.body;
  jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1);
  
  try {
    let gigs = await Gig.find();

    // Filters
    let sortedGigs = gigs.sort((a,b) => {
      return b.creationDate - a.creationDate;
    });
    const filteredGigs = sortedGigs.filter(gig => {
      return gig.title.includes(jobType);
    });
    let stateJobs = filteredGigs.filter(job => {
      return job.stateLink == stateLink;
    });

    if (jobType == "") {
      // if User doesnt input a jobType title
      if (stateLink == "") {
        // If user also doesnt input a stateLink
        res.render('static/gigs/searchResults', {
          gigs: sortedGigs, title: "Weemaple Jobs Search | weemaple.com"
        });
      } else {
        // If user inputs a stateLink
        res.render('static/gigs/searchResults', {
          gigs: stateJobs, title: "Weemaple - " + " Location: " + stateLink + " | weemaple.com",
          shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
        });
      }
    } else {
      // If User inputs a jobType title
      if (stateLink == "") {
        // If User doesnt input a stateLink
        res.render('static/gigs/searchResults', {
          gigs: filteredGigs, title: "Weemaple - Job Search Title: " + jobType + " | weemaple.com"
        });
      } else {
        // If User also inputs a stateLink
        res.render('static/gigs/searchResults', {
          gigs: stateJobs, title: "Weemaple - Job Title: " + jobType + " Location: " + stateLink + " | weemaple.com", shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
        });
      }
    }
  } catch (error) {
    res.render('404', {
      title: "Weemaple - Error Page", 
      error: error
    });
  }
  
});

router.get('/category/:slug/:id', async (req, res) => {
  
  let gig = await Gig.findById(req.params.id);
  let gigs;
  try {
    gigs = await Gig.find({category: gig.category});
    res.render('static/gigs/searchResults', {
      gigs: gigs, title: "Weemaple - Job Category: " + "Category" + " | weemaple.com", shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
    });
  } catch(e) {
    gigs = []
    res.render('static/gigs/searchResults', {
      gigs: gigs, title: "Weemaple - Job Category: " + "Category" + " | weemaple.com", shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
    });
  }
  
})

router.get('/job/:slug/:id', async (req, res, next) => {
  try {
    let gig = await Gig.findById(req.params.id);

    gig.viewCount += 1;
    
    await gig.save();

    console.log("Gig:", gig);
    let shortDescriptionGig = "";
    if (gig.shortDescription === null || gig.shortDescription === "") {
      shortDescriptionGig = `Weemaple Job Available - ${gig.title}`
    } else {
      shortDescriptionGig = gig.shortDescription;
    }

    res.render('static/gigs/singleGig', { title: "Weemaple - " + gig.title + " hiring now", gig: gig, shortDescription: shortDescriptionGig });

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
    
    training.docs.sort((a, b) => {
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
      shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment.",
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
      title: "Weemaple - Training Search Category: " + category + " | weemaple.com",
      shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
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
      training: training,
      shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
    });
  } catch(error) {
    throw error;
  }
});

router.get('/weegigs', function(req, res, next) {
  res.render('static/gigs/gigs', { title: 'Weemaple', message: "", shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment." });
});

router.get('/about-us', function(req, res, next) {
  res.render('static/eezy', { title: 'Weemaple', message: "", shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment." });
});

router.get('/build-with-us', (req, res) => {
  res.render('static/buildWithUs', {
    title: 'Weemaple', shortDescription: "With Weemaple, you can search for jobs online to find the next step in your career journey. We're to help you every stage of your employment."
  })
});

module.exports = router;