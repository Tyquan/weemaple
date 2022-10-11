const User = require('../../Models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const newUser = new User(req.body);
    if (!newUser.email || !newUser.password) return res.status(400).json({'message': 'Email and password are required'});

    /*
        Handle duplicate users
    */

    // if there are no duplicates continue with the function
    try {
        // hash the password
        const hashPassword = await bcrypt.hash(newUser.password, 10);

        newUser.password = hashPassword;
        newUser.loggedIn = true;

        // save new user to the database
        await newUser.save()
            .then((data) => {
                res.status(201).json({"message": `New user ${data} created`});
            }).catch(err => {
                res.status(400).json({
                    "message": `Error saving new user to the database: ${err}`
                })
            });
    } catch (err) {
        res.status(500).json({"message": err.message});
    }
}

module.exports = { handleNewUser };