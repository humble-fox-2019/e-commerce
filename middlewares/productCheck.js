const { jwt } = require("../helpers")
const Product = require("../models/product")

function productCheck(req, res, next) {
    try {
        const token = req.headers.token
        const decode = jwt.decodeToken(token)

        req.decode = decode
        let _id = req.decode.id

        Product.findById(_id)
            .then(product => {
                if (product) {
                    next()
                } else {
                    next({ statusCode: 401, msg: "You do not have access to data product" })
                }
            })
            .catch(next)
    }
    catch{
        next({ statusCode: 401, msg: "You do not have access to data product" })
    }
}

module.exports = productCheck
