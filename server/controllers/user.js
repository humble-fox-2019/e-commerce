const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(user => {
        res.status(201).json({ user, token: generateToken({ id: user._id, email: user.email }) })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (user) {
          if (compareHash(password, user.password)) {
            res.status(200).json({ user, token: generateToken({ id: user._id, email: user.email }) })
          } else {
            next({ status: 400, message: 'Invalid login or password' })
          }
        } else next({ status: 400, message: 'Invalid login or password' })
      })
      .catch(next)
  }
}

module.exports = UserController