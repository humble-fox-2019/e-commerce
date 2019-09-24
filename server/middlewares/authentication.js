const User = require('../models/user')
const { compareHash } = require ('../helpers/bcrypt')

function authentication (req,res,next) {
    User.findOne({ email : req.body.email })
    .then((user)=>{
        if (user){
            req.user = user
            if (compareHash(req.body.password,user.password)){
                next()
            } else {
                next({
                    status:404, 
                    message: "invalid email/password"}) 
            }   
        } else {
            next({
                status:404, 
                message: "invalid email/password"}) 
        }
    })
    .catch (next)
}

module.exports = authentication;