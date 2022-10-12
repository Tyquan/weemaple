const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401); // not valid if there is no role passed in
        const rolesArray = [...allowedRoles];
        // return true if the requested role is in the roles array
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        // if not true unauthorized
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles