const Pet = require('../models/pet');

class PetController {

    static create(req, res, next) {
        const { cloudStoragePublicUrl } = req.file;
        const { species, stock, price } = req.body;
        Pet.create({
            species,
            photo: cloudStoragePublicUrl,
            stock,
            price,
        })
            .then(function (dog) {
                res.status(201).json(dog);
            })
            .catch(next);
    }

    static findAll(req, res, next) {
        Pet.find()
            .then(pets => {
                res.status(200).json(pets);
            })
            .catch(next);
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        Pet.findByIdAndDelete(_id)
            .then(() => {
                res.status(200).json({
                    message: `Success delete dog from list`
                });
            })
            .catch(next);
    }
}

module.exports = PetController;

