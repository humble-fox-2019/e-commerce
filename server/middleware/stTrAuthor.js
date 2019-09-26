const Transaction = require('../models/Transaction')

function storeTransactionAuthorization(req, res, next) {
  Transaction.findById(req.params.id)
    .then(transaction => {
      if(transaction.store == req.decode.id) {
        next()
      }else {
        next({
          status: 401,
          message: 'You are not authorized'
        })
      }
    })
    .catch(next)
}


module.exports = storeTransactionAuthorization
