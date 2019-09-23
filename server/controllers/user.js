const User = require('../models/user');
const Cart = require('../models/cart');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {

    static create(req, res, next) {
        const { username, email, password } = req.body;
        User.create({
            username,
            email,
            password
        })
            .then(function (user) {
                Cart.create({
                    UserId: user._id
                })
                return user
            })
            .then(user => {
                let payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({
                    token,
                    username: user.username
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                if (user) {
                    if (comparePassword(req.body.password, user.password)) {
                        let payload = {
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        let token = generateToken(payload)

                        res.status(200).json({
                            token,
                            username: user.username
                        })
                    }
                    else {
                        next({ code: 404, message: "wrong email/password" })
                    }
                }
                else {
                    next({ code: 404, message: "wrong email/password" })
                }
            })
            .catch(next)
    }

    static adminLogin(req, res, next) {
        if (req.body.email === "admin@admin.com") {
            User.findOne({
                email: req.body.email
            })
                .then((user) => {
                    if (user) {
                        if (comparePassword(req.body.password, user.password)) {
                            let payload = {
                                _id: user._id,
                                username: user.username,
                                email: user.email
                            }
                            let token = generateToken(payload)

                            res.status(200).json({
                                token,
                                username: user.username
                            })
                        }
                        else {
                            next({ code: 404, message: "wrong email/password" });
                        }
                    }
                    else {
                        next({ code: 404, message: "wrong email/password" });
                    }
                })
                .catch(next)
        } else {
            next({ code: 403, message: "Only Admin can login to this site" });
        }
    }

}

module.exports = UserController;