const { verifyToken } = require('../helpers/jwt')

function tokenVerification (req,res,next) {
    const decode = verifyToken( req.headers.token )
    if (decode){
        req.decode = decode
        next()
    } else {
        next({
            status:404, 
            message: "invalid token"
        })
    }
}

module.exports = tokenVerification