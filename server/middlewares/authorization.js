const User = require('../models/user');

module.exports = {
    isAdmin(req, res, next) {
        let role = req.decoded.role;
        
        if (role === 'admin') {
            next()
        } else {
            next({status: 401, message: "You haven't authorized"})
        }
    }
}