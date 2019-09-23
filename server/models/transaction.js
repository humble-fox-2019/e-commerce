var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  ProductList : [
    {
        Product :   {
              type: Schema.Types.ObjectId, 
              ref: 'Product',
          },
          quantity : {
              type : Number
          }
    }
  ],
  User : { type: Schema.Types.ObjectId, ref : 'User' },
  totalHarga : {
      type : Number,
      min : [1000 , ' Total Harga tidak boleh di bawah 1000']
  },
  status : {
      type : String,
      default : 'first'
  },
  alamat : {
      type : String,
      required : [true,'alamat harus di isi'],
      minlength : ['5' , 'minimal alamat 5 huruf']
  }
},{timestamps : {  createdAt : 'created_at' }});

let Transaction = mongoose.model('Transaction' , TransactionSchema)


module.exports = Transaction
