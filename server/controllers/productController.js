const Product = require('../models/product');
const deleteFile = require('../helpers/deleteFileGcs');

class ProductController {
    static findAll(req, res, next) {
        Product.find()
            .then(data => {
                res.status(200).json(data);
            }).catch(next);
    }

    static store(req, res, next) {
        const { name, author, price, description, category, stock } = req.body;
        let data = { name, author, price, description, category, stock }

        if (req.file) {
            data.image = req.file.cloudStoragePublicUrl;
        }

        Product.create(
            data
        ).then(data => {
            res.status(201).json({ message: 'successfully created', data })
        }).catch(next);
    }

    static findOne(req, res, next) {
        Product.findOne({
            _id: req.params.id
        }).then(product => {
            res.status(200).json(product);
        }).catch(next);
    }

    static update(req, res, next) {
        const { name, author, price, description, category, stock } = req.body;
        const data = { name, author, price, description, category, stock };
        
        if (req.file) {
            data.image = req.file.cloudStoragePublicUrl;
            
            let file = data.image.split('/')
            let fileName = file[file.length - 1];
            deleteFile(fileName)
        }
        
        Product.findByIdAndUpdate({ _id: req.params.id }, data, { omitUndefined: true, runValidators: true })
            .then(data => {
                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then(data => {
                let file = data.image.split('/')
                let fileName = file[file.length - 1];

                deleteFile(fileName)
                
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = ProductController
