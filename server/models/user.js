var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { HashingPassword }  = require('../helpers/password');
var UserSchema = new Schema({
  username : {
      type : String,
      required : [true , 'Username Required'],
      validate : {
        validator : function(){
            return new Promise((resolve,reject)=>{
                User.findOne({ username : this.username })
                .then(user=>{
                    if(user){
                        resolve(false)
                    }else {
                        resolve(true)
                    }
                })
            })
        },
        message : 'Username Must Be Unique'
      }
  },
  password : {
      type : String,
      required : [true,'Password Required'],
      minlength : [5,'Password minimal 5 huruf']
  },
  email : {
      type : String,
      required : [true,'Email Required'],
      match :  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 'email invalid'],
      validate : {
        validator : function(){
            return new Promise((resolve,reject)=>{
                User.findOne({ email : this.email })
                .then(user=>{
                    if(user){
                        resolve(false)
                    }else {
                        resolve(true)
                    }
                })
            })
        },
        message : 'Email Must Be Unique'
      }
  },
  cartList : 
    [
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
voucher : {
    type : Number,
    default : 0
}
});
UserSchema.pre('save' , function(next){
    this.password = HashingPassword(this.password)
    next()
})

let User = mongoose.model('User' , UserSchema)


module.exports = User