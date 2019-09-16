const Store = require('../models/Store')
const { comparePassword } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class StoreController {

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
            Store.findOne({ email })
                .then(store => {
                    if(store) {
                        if(comparePassword(password, store.password)) {
                            const payload = {
                                id: store._id,
                                name: store.name,
                                email: store.email,
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
        const { name, email, password, city, province } = req.body

        Store.create({ name, email, password, city, province })
            .then(store => {
                const payload = {
                    id: store._id,
                    name: store.name,
                    email: store.email,
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
module.exports = StoreController

