const { User } = require('../models')
class voucher_controller {
    static getAllUser(req,res,next){
        User.find({
            email : {
                $ne : 'master@mail.com'
            }
        })
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }
}

module.exports = voucher_controller