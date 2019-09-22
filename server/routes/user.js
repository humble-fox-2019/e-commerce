const Router = require("express").Router();
const controllers = require("../controllers");

Router.post("/register", controllers.User.register);
Router.post("/login", controllers.User.login);

module.exports = Router;
