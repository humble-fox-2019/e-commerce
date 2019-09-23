module.exports = (req,res,next) => {
    const user = require('../models/user')
    const id = req.decode.id
    user.findById(id).where('role').equals('Admin')
    .then(data => {
        console.log(data)
            if(data == null) {
                res.status(401).json({
                    message: 'You are not Authorized!!'
                })
            }
            next()
    }).catch(err => {
        res.status(401).json({
            message: 'You are not Authorized!!'
        })
    })
}

