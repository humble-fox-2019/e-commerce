'use strict'

const User = require('../models/user')

module.exports = {
  admin: async function (req, res, next) {
    const userId = req.user
    if (userId) {
      const user = await User.findOne({ _id: userId }).exec()
      if (user.isAdmin) {
        next()
      } else {
        console.log('not authorized')
        next({ code: 401, msg: 'not authorized' })
      }
    } else {
      console.log('not authorized')
      next({ code: 401, msg: 'not authorized' })
    }
  }
}
