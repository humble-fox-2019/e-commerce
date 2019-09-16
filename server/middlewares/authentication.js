'use strict'

const { verifyToken } = require('../helpers/jwt')

module.exports = {
  authentication: function (req, res, next) {
    try {
      console.log(req.headers)
      const decoded = verifyToken(req.headers.token)
      console.log(decoded)
      console.log('sudah di decode')
      req.decoded = decoded
      console.log('berhasil decode')
      console.log(req.decoded)
      console.log('<<<<<<<<<<<<<<<<<<,')
      next()
    } catch (err) {
      console.log(err)
      next({ status: 401, message: 'Please sign in first!' })
    }
  }
}
