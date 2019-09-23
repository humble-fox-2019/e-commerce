const { verifyToken } = require('../helpers/jwt');
const Transaction = require('../models/transaction');

module.exports = {
    Authentication: (req, res, next) => {
        if (req.headers.token) {
            try {
                let decode = verifyToken(req.headers.token);
                req.decode = decode;
                next();
            }
            catch{
                next({ status: 401, message: "invalid token", err: err });
            }
        }
        else {
            next({ status: 401, message: "please login first" });
        }
    }
    ,
    AuthAdmin: (req, res, next) => {
        if (req.decode.email === 'admin@admin.com' && req.decode.username === 'admin') {
            next()
        } else {
            next({ status: 403, message: `Forbidden, only authorize user can do this action` })
        }
    },
    AuthOwner: (req, res, next) => {
        const _id = req.params.id;
        Transaction.findById(_id)
            .then(transaction => {
                if(transaction){
                    if(transaction.UserId == req.decode._id ){
                        next();
                    }else{
                        next({status: 403, message: `Forbidden, only authorize user can do this action`})
                    }
                }else{
                    next({status: 404, message: `Transaction not found`})
                }
            })
            .catch(next)

    }
}