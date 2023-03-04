const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../user/User');

const handleLogout = async (req, res) => {

    // On client also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204); // success but no content

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        // erase the cookie
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); // success but no content
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    foundUser.loggedIn = false;
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204)
}

module.exports = { handleLogout };