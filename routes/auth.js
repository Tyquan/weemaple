const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../controllers/user/User');


/*
* AUTH ROUTES
*/

router.get('/signup', (req, res) => {
    res.render('static/auth/signup', {'message': ''});
})
router.get('/login', (req, res, next) => {
    res.render('static/auth/login')
});


// SIGNUP
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

        res.redirect('../users/usergigs');
    } catch (err) {
        res.render('static/auth/signup', { 'message': 'Unable to signup please try again' });
    }
});

// LOGOUT
router.get('/logout', (req, res, next) => {
    req.session = null;
    session = null;
    res.redirect('../');
});

// LOGIN
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
            res.redirect('../users/usergigs');
        } else {
            res.render('static/auth/login', {message: 'Unable to sign up. Please try again...'});
        }
        });
    }

});



module.exports = router;