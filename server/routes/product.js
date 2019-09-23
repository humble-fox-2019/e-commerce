const express = require("express");
const controllers = require("../controllers");
const images = require("../helpers/images");

const Router = express.Router();
Router.route("/")
  .get(controllers.Product.index)
  .post(
    images.multer.single("image"),
    images.sendUploadToGCS,
    controllers.Product.store
  );
Router.delete("/delete/:id", controllers.Product.delete);

module.exports = Router;
