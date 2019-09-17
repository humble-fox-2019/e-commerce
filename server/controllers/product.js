const Product = require('../models/product');
const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;
const KEYFILE_PATH = process.env.KEYFILE_PATH;
const DEFAULT_IMG = 'https://www.pdma.org/global_graphics/default-store-350x350.jpg';

class ProductController {
    static findAll(req, res, next) {
        Product.find()
        .then(products => {
            //    console.log(products)
            res.status(200).json(products);
        })
        .catch(next);
    }
    
    static findOne(req, res, next) {
        const _id = req.params.id;
        Product.findOne({_id})
        .then(product => {
            res.status(200).json(product)
        })
        .catch(next);
    }
    
    static create(req, res, next) {
        const { name, description, price, stock } = req.body;
        const image = req.file.publicUrl;
        
        Product.create({ name, description, price, stock, image })
        .then(product => {
            res.status(201).json(product);
        })
        .catch(next);
    }
    
    static update(req, res, next) {
        const { name, description, price, stock } = req.body;
        const _id = req.params.id;
        const image = req.file ? req.file.publicUrl : DEFAULT_IMG;

        Product.findById(_id)
               .then(product => {
                const storage = new Storage({
                    projectId: GCLOUD_PROJECT,
                    keyFilename: KEYFILE_PATH
                });

                if (req.file) {
                    let deleteFile = product.image;
                    let fileName = deleteFile.replace(/(https:\/\/storage.googleapis.com\/e-commerce-igun\/)/, '')

                    product.image = image; // update image with new uploaded image

                    // delete old image from gcs
                    storage
                         .bucket(CLOUD_BUCKET)
                         .file(fileName)
                         .delete();
                    
                    product.name = name;
                    product.description = description;
                    product.price = price;
                    product.stock = stock;
                    return product.save();
                }
               })
               .then(() => {
                   res.status(200).json('Product updated');
               })
    }
    
    static delete(req, res, next) {
        const _id = req.params.id;
        
        Product.findById(_id)
        .then(product => {
            const storage = new Storage({
                projectId: GCLOUD_PROJECT,
                keyFilename: KEYFILE_PATH
            });
            
            let deleteFile = product.image;
            let fileName = deleteFile.replace(/(https:\/\/storage.googleapis.com\/e-commerce-igun\/)/, '')
            
            storage
            .bucket(CLOUD_BUCKET)
            .file(fileName)
            .delete();
            
            return product.delete();
        })
        .then(() => {
            res.status(200).json('Product deleted')
        })
        .catch(next);
    }
}

module.exports = ProductController;