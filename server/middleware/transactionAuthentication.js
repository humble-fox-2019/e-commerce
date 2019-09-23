function transactionAuthorization(req, res, next) {
  if(req.isUser || req.isStore) {
    next()
  }else {
    next({
      status: 401,
      message: 'You are not authorized'
    })
  }
}


module.exports = transactionAuthorization
