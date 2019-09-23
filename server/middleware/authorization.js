const {
    verifyToken
} = require('../helper/jwt')
const user = require('../model/user')

module.exports =
    function authorized(req, res, next) {
        user.findById(req.payload._id)
            .then(data => {
                if (data.userId == req.payload._id) {
                    next()
                } else {
                    next({
                        code: 401,
                        message: ' Unauthorized User'
                    })

                }
            })
            .catch(err => {
                next({
                    code: 401,
                    message: ' Unauthorized User'
                })
            })
    }