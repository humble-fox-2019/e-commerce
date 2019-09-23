var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    ProductList:
        [
            {
            type: Schema.Types.ObjectId, ref: 'Product',
                quantity : {
                    type : Number,
                    min : [1 , 'minimal qty 1']
                }
            }
        ],
        User : {
            type: Schema.Types.ObjectId, ref: 'User',
        }
});

let Cart = mongoose.model('Cart', CartSchema)


module.exports = Cart
