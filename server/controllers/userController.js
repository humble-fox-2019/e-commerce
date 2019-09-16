const User = require('../models/User')
const { comparePassword } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {

    static signin(req, res, next) {
        const { email, password } = req.body

        let errors = []
        if(!email) {
            errors.push('email required')
        }
        if(!password) {
            errors.push('password required')
        }
        if(errors.length > 0) {
            res.status(400).json({
                errors
            })
        }else {
            User.findOne({ email })
                .then(user => {
                    if(user) {
                        if(comparePassword(password, user.password)) {
                            const payload = {
                                id: user._id,
                                username: user.username,
                                email: user.email,
                            }
                            const token = sign(payload)
                            res.json({
                                token,
                                message: 'success signin'
                            })
                        }else {
                            return next({
                                status: 401,
                                message: 'wrong email/password'
                            })
                        }
                    }else{
                        return next({
                            status: 401,
                            message: 'wrong email/password'
                        })
                    }
                })
            }
        }

    static signup(req, res, next) {
        const { username, email, password } = req.body

        User.create({ username, email, password })
            .then(user => {
                const payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }
                const token = sign(payload)
                    res.status(201).json({
                        message: 'success signup',
                        token
                    })
            })
            .catch(next)
    }
}
module.exports = UserController

