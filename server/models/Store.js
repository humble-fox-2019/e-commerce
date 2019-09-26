const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    email: {
        type: String,
        required: [true, 'email required'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'invalid email']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    city: {
        type: String,
        required: [true, 'city required']
    },
    province: {
        type: String,
        required: [true, 'province required']
    }
})

storeSchema.path('email').validate(function(value) {
    return Store.findOne({ email: value })
        .then(store => {
            if(store) {
                return false
            }
        })
    }, 'Email already registered')

storeSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store
