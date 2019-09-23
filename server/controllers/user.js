const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { tokenGenerate } = require('../helpers/jwt')

class userController {
    static register(req, res, next) {
        const { name, email, password, rule, cart } = req.body
        User.create({
            name, email, password, rule, cart
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            email
        })
            .then(user => {
                let payload = {
                    id: user._id,
                    name: user.name,
                    rule: user.rule
                }
                if (user && comparePassword(password, user.password)) {
                    let token = tokenGenerate(payload)
                    res.status(201).json({
                        id: user._id,
                        token
                    })
                } else {
                    next({
                        status: 400,
                        message: `EMAIL/PASSWORD IS NOT VALID`
                    })
                }
            })
            .catch(next({
                status: 400,
                message: `EMAIL/PASSWORD IS NOT VALID`
            }))
    }
}

module.exports = userController
