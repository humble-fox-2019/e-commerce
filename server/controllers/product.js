const models = require("../models");
const deleteFile = require("../helpers/images").deleteFile;

class Product {
  static index(req, res, next) {
    models.Product.find()
      .then(products => {
        res.status(200).json(products);
      })
      .catch(next);
  }

  static store(req, res, next) {
    const { name, stock, des, price } = req.body;
    const image = req.file.cloudStoragePublicUrl;
    models.Product.create({
      name,
      stock,
      des,
      price,
      image
    })
      .then(product => {
        res.status(201).json({
          type: "success",
          message: `${product.name} created`
        });
      })
      .catch(next);
  }

  static delete(req, res, next) {
    let { id } = req.params;
    models.Product.findById(id)
    .then(data => {
        if (data.image) {
          deleteFile(req, res, next, data.image);
        }
        return models.Product.findByIdAndDelete(id);
      })
      .then(() => {
        res.status(204);
      })
      .catch(next);
    
  }
}

module.exports = Product;
