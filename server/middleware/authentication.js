const {
    verifyToken
} = require('../helper/jwt')


module.exports =
    function authenticate(req, res, next) {
        try {
            let payload = verifyToken(req.headers.token)
            req.payload = payload
            next()
        } catch {
            next({
                code: 401,
                message: 'UnAuthenticate User'

            })
        }
    }