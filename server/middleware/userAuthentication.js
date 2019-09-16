const { verify } = require('../helpers/jwt')

function userAuthentication(req, res, next) {
    try{
        const decode = verify(req.headers.token)
        req.decode = decode
        next()
    }catch(err){
        next(err)
    }
}

module.exports = userAuthentication

