const jwt = require('jsonwebtoken')


function sign(payload) {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY)
}


function verify(token) {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY)
}


module.exports = {
    sign,
    verify
}

