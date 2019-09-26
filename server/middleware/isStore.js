const { verify } = require('../helpers/jwt')
const Store = require('../models/Store')

function isStore(req, res, next) {
  try{
    const decode = verify(req.headers.token)
    Store.findOne({ email: decode.email })
      .then(store => {
        if(store) {
          req.decode = decode
          req.isStore = true
        }else {
          req.isStore = false
        }
        next()
      })
      .catch(next)
  }catch(err) {
    next(err)
  }
}


module.exports = isStore
