const authorizeAdmin = (req, res, next) => {
    console.log('2');
    if(req.decoded.role === 'admin'){
        console.log(3);
        next()
    } else {
        res.status(403).json({
            msg: 'you do not have access to do this access'
        })
    }
}

module.exports = authorizeAdmin