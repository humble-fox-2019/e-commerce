const User = require('../models/User')

function cartChecker(req, res, next) {
  User.findById(req.decode.id)
    .populate('carts')
    .then(user => {
      let isAlready = false
      for(let i=0;i<user.carts.length;i++) {
        //check apakah cart udah ada
        if(user.carts[i].product == req.body.id) {
          isAlready = true
        }
      }
      if(isAlready) {
        //kalau udah ada, ngak boleh add lagi
        res.status(400).json({
          message: 'Can\'t add cart with same product id'
        })
      }else {
        next()
      }
    })
    .catch(next)
}

module.exports = cartChecker
