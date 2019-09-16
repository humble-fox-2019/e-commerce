const mongoose = require('mongoose');
const { hash } = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: [true , "Username is required"],
        unique: [true , "Username already registered"],
        minlength: [5 , "Username Min (5) Character"]
    },
    password : {
        type: String,
        required: [true , "Password is required"],
        minlength: [5 , "Username Min (5) Character"]
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        unique : [true, "Email already registered"],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email Format']
    },
    role : {
        type : String,
        default : 'customer'
    }
},
{
    timestamps: true,
    versionKey:false
})

userSchema.pre('save' , function() {
    this.password = hash( this.password );
})

const User = mongoose.model('User' , userSchema )
module.exports = User