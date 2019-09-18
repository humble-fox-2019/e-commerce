const authorizeAdmin = (req, res, next) => {
    if(req.decoded.role === 'admin'){
        next()
    } else {
        res.status(403).json({
            msg: 'you do not have access to do this access'
        })
    }
}

module.exports = authorizeAdmin