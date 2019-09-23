const userModel = require('../model/user')
const checkHash = require('../helper/hashPassword').checkHash
const {
    generateToken
} = require('../helper/jwt')



class UserModel {

    static create(req, res, next) {
        let obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        userModel.create(obj)
            .then(data => {
                res.status(201).json({
                    data
                })
                // console.log(data, '<<< DATA BERHASIL DIBUAT')
            })
            .catch(next)
    }

    static login(req, res, next) {

        userModel.findOne({
                email: req.body.email
            })
            .then(data => {
                if (checkHash(req.body.password, data.password)) {
                    console.log('masoook pak eko')
                    let obj = {
                        id: data._id,
                        name: data.name,
                        email: data.email
                    }

                    let token = generateToken(obj)


                    console.log(token, '<<< TOKEN DARI LOGIN')

                    res.status(201).json({
                        token,
                        id: data._id,
                        name: data.name,
                        email: data.email
                    })
                }
            })
            .catch(next)

    }

}

module.exports = UserModel