const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    product : Array,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , 'userId is required'] 
    },
    status : {
        type: String,
        enum : {
            values : ['pending' , 'paid'] ,
            message : 'status only can pending or paid'
        },
        default: 'pending'
    }
}, {
    timestamps: true,
    versionKey: false
})

const transaction = mongoose.model('Transaction' , transactionSchema );
module.exports = transaction