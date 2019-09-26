const { verify } = require('../helpers/jwt')
const Store = require('../models/Store')

function storeAuthentication(req, res, next) {
    try{
        const decode = verify(req.headers.token)

        Store.findById(decode.id)
            .then(store => {
                if(store) {
                    req.decode = decode
                    next()
                }else{
                    next({
                        status: 401,
                        message: 'not authorized'
                    })
                }
            })
            .catch(next)
    }catch(err){
        next(err)
    }
}

module.exports = storeAuthentication

