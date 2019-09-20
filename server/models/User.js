const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
        minlength: [4, 'name minimal 4 characters'],
        maxlength: [20, 'name max 20 characters']
    },
    email: {
        type: String,
        required: [true, 'email required'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'invalid email']
    },
    password: {
        type: String,
        required: [true, 'password required']
    }
})

userSchema.path('email').validate(function(value) {
    return User.findOne({ email: value })
        .then(user => {
            if(user) {
                return false
            }
        })
    }, 'Email already registered')

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

