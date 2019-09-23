const mongoose = require('mongoose')
const uniqueValiator = require('mongoose-unique-validator')
const { hashPassword } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name must be filled`]
    },
    email: {
        type: String,
        unique: [true, `Email already registered`],
        validate: {
            validator: function (value) {
                let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(value)
            },
            message: `Email format is not a valid!`
        }
    },
    password: {
        type: String
    },
    rule: String,
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
        timestamps: true
    })

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

userSchema.plugin(uniqueValiator)
const User = mongoose.model('User', userSchema)
module.exports = User