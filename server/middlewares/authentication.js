const { verifyToken } = require('../helpers/jwt');

module.exports = {
    authentication(req, res, next) {
        let { token } = req.headers;

        try {
            let decoded = verifyToken(token);
            req.decoded = decoded;
            next();
        } catch (error) {
            next({status: 403, message: 'You must login first'})
        }
    }
}