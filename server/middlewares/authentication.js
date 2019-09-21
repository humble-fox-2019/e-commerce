const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/')

module.exports = (req, res, next) => {
  try {
    const decode = verifyToken(req.headers.token)
    User.findOne({ email: decode.email })
      .then(user => {
        if (user) {
          req.decode = decode
          next()
        } else {
          next({ status: 400, message: 'User not found' })
        }
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

/*

module.exports = {
  authentication: function(req, res, next) {
    try {
      const decode = verify(req.headers.token)
      User.findOne({ email: decode.email })
        .then(user => {
          if(user) {
            req.decode = decode
            next()
          } else {
            next({ status: 403, message: 'user not found, authentication failed' })
          }
        })
        .catch(next)
    } catch(err) {
      next({ status: 403, message: err })
    }
  }
}

*/