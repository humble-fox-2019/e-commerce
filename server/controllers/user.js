const models = require("../models");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

if (process.env.NODE_ENV === "development") require("dotenv").config();

class User {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    models.User.create({
      name,
      email,
      password,
      role: "customer"
    })
      .then(user => {
        res.status(201).json({
          message: "Register Success",
          type: "success"
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    models.User.findOne({
      email
    })
      .then(user => {
        if (!user || !bcrypt.compare(password, user.password)) {
          next({
            status: 400,
            message: `invalid username / password !`
          });
        } else {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          };

          let isAdmin = false;
          if(user.role === "admin") isAdmin = true

          let token = jwt.generate(payload);
          res.status(200).json({
            message: "Login Success",
            type: "success",
            token,
            isAdmin
          });
        }
      })
      .catch(next);
  }
}

module.exports = User;
