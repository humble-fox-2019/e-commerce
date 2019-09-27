const Cart = require('../models/cart');
const Product = require('../models/product');

class CartController {
	static create(req, res, next) {
		const userId = req.decoded._id;
		console.log(req.body);
		const { listItems, totalPayment } = req.body;
		for (let k in listItems) {
			let stock = listItems[k].stock - listItems[k].quantity;
			Product.updateOne(
				{
					_id: k
				},
				{
					stock: stock
				}
			).then((data) => {
				Cart.create({
					userId,
					listItem : listItems,
					totalPayment
				})
					.then((data) => {
						res.status(200).json({
							message: 'Your cart request has been process'
						});
					})
					.catch(err =>{
						console.log(err);
					});
			
			
			})};
		}
}

module.exports = CartController;
