const mongoose = require('mongoose');
const { hashPasword } = require('../helpers/bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        validate: [
            {
                validator: function(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                },
                msg: 'Email format is invalid'
            }, 
            {
                validator: function(email) {
                    return mongoose.models.User.findOne({ email })
                    .then(user => {
                        if (user) return false;
                        else return true;
                    })
                    .catch(() => {
                        return true;
                    })
                },
                msg: 'Email already registered'
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914__340.png'
    }, 
    role: {
        type: String,
        default: 'customer'
    }, 
    cart: [
        {
            ProductId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            count: {
                type: Number,
                default: 1
            }
        }
    ] 
}, { timestamps: true });

UserSchema.pre('save', function(next) {
    this.password = hashPasword(this.password);
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;