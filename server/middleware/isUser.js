const { verify } = require('../helpers/jwt')
const User = require('../models/User')

function isUser(req, res, next) {
  try {
    const decode = verify(req.headers.token)
    User.findOne({ email: decode.email })
      .then(user => {
        if(user) {
          req.decode = decode
          req.isUser = true
        }else {
          req.isUser = false
        }
        next()
      })
      .catch(next)
  }catch(err) {
    next(err)
  }
}

module.exports = isUser
