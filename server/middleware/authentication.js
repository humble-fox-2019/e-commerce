const { decode } = require('../helpers/jwt')
function authentication ( req, res ,next ) {
    try {
        const token = req.headers.token;
        const decoded = decode( token )
        req.decode = decoded
        next()
    } catch (error) {
        next({ status : 401 , message: "Need Token"})
    }
}
module.exports = authentication 