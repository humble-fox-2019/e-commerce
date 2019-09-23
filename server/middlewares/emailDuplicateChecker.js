const User = require ('../models/user')

function checkDuplicateEmail (req,res,next){
    User.findOne({ email : req.body.email })
    .then((user)=>{
        if (user){
            next({
                status:404, 
                message: "invalid email/password"})
        } else {
            next()
        }
    })
}

module.exports = checkDuplicateEmail