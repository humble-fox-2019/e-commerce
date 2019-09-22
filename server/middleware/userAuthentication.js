const { verify } = require('../helpers/jwt')
const User = require('../models/User')

function userAuthentication(req, res, next) {
    try{
        const decode = verify(req.headers.token)

        User.findOne({ email: decode.email})
            .then(user => {
                if(user) {
                    req.decode = decode
                    next()
                }else {
                    next({
                        status: 404,
                        message: 'User not found'
                    })
                }
            })
    }catch(err){
        next(err)
    }
}

module.exports = userAuthentication

