const Transaction = require('../models/Transaction')

function userTransactionAuthorization(req, res, next) {
  Transaction.findById(req.params.id)
    .then(transaction => {
      if(transaction.user == req.decode.id) {
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


module.exports = userTransactionAuthorization
