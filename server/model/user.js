const mongoose = require('mongoose')
const schema = mongoose.Schema
const {
    hashPassword
} = require('../helper/hashPassword')


const userSchema = new schema({
    name: {
        type: String,
        required: [true, 'Name Required']
    },
    email: {
        type: String,
        require: [true, 'Email Required'],
        validate: {
            validator: function (value) {
                let check = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return check.test(value)
            },
            message: 'Not a valid email format!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password Required']
    }
})

// HASH PASSWORD
userSchema.pre('save', function (next) {
    console.log(this.password, '<<<< DARI HOOK HASH PASSWORD')

    let password = hashPassword(this.password)
    this.password = password
    console.log(this.password)
    next()
})
userSchema.pre('save', function (next) {
    return user.findOne({
            email: this.email
        })
        .then(data => {
            if (data) {
                throw new Error('Email Already Used')
                // console.log('ini data usernya')

            } else {
                next()
            }
        })
})

let user = mongoose.model('User', userSchema)




module.exports = user