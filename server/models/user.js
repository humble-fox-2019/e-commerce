const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require ('../helpers/bcrypt')

const userSchema = new Schema ({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}) 

userSchema.pre('save', function(){
    this.password = hashPassword(thus.password)
})

const User = mongoose.model('User', userSchema)

module.exports = User