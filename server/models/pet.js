const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = Schema({
    species: {
        type: String,
        required: [true, `Dog's species can not be empty`]
    },
    photo: {
        type: String,
        required: [true, `Dog's photo can not be empty`]
    },
    price: {
        type: Number,
        required: [true, `Dog's price can not be empty`]
    },
    stock:{
        type:Number,
        required: [true, `Dog's stock can not be empty`]
    }
});

const Dog = mongoose.model('Dog', DogSchema);
module.exports = Dog;