const Cart = require('../models/cart')
class ChartController {
    static getOne(req, res, next) {
        Cart.findOne({
            userId: req.headers.decode.id,
        })
            .populate('products')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static create(){

    }
}
module.exports = ChartController