const Product = require('../models/product');

class ProductController {
	static create(req, res, next) {
		const { productName, image, category, price, stock, description } = req.body;
		Product.create({
			productName,
			image,
			category,
			description,
			price,
			stock
		})
			.then((data) => {
				res.status(201).json({
					message: 'Success create new product',
					data: data
				});
			})
			.catch((err) => {
				res.status(400).json({
					message: err
				});
				next({
					status: 400,
					err: err
				});
			});
	}
	static destroy(req, res, next) {
		let { id } = req.params;
		Product.findByIdAndDelete(id)
			.then((data) => {
				res.status(200).json({
					message: `Success deleted`,
					data: data
				});
			})
			.catch((err) => {
				next(err);
			});
	}
	static updatePut(req, res, next) {
		const { productName, image, category, price, stock, description } = req.body;
		Product.findOneAndUpdate({
			_id: req.params.id,},
			{
			productName, 
			image, 
			category, 
			price, 
			stock, 
			description
		}).then(data => {
			res.status(200).json({
				message : 'Success Update'
			})
		})
		.catch(next)
	}
	static getOne(req, res, next) {
		let { id } = req.params;
		Product.findById(id)
			.then((data) => {
				res.status(200).json({
					data
				});
			})
			.catch((err) => {
				res.status(404);
				next(err);
			});
	}
	static getCategory(req, res, next) {
		const { category } = req.body;
		console.log(category);
		Product.find({ category })
			.then((data) => {
				res.status(200).json({
					data
				});
			})
			.catch(next);
	}
	static getAll(req, res, next) {
		Product.find({})
			.then((data) => {
				res.status(200).json({
					data
				});
			})
			.catch(next);
	}
}

module.exports = ProductController;
