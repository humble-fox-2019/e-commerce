const Router = require("express").Router();
const user = require("./user");
const product = require("./product");

Router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to obral sepatu"
  });
});

Router.use("/user", user);
Router.use("/product", product);

module.exports = Router;
