const Product = require('./product');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		listItem: {
			type: Object,
			required: [ true, 'listItem is required' ]
		},
		quantity: {
			type: Number
		},
		totalPayment: {
			type: Number
		}
	},
	{
		timestamps: true
	}
);

const Cart = mongoose.model('Cart', cartSchema);

cartSchema.pre('save', function() {
	let quantity = 0;
	for (let k in this.listItem) {
		quantity += this.listItem[k].quantity;
	}
	this.quantity = quantity;
	next();
});

module.exports = Cart;
