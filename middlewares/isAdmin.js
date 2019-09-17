const { jwt } = require("../helpers")

function isAdmin(req, res, next) {
    try {
        if (req.decode.role === 'admin') {
            next();
        } else {
            next({ statusCode: 403, msg: 'You dont have authorized to this data' })
        }
    }
    catch{
        next({ statusCode: 403, msg: "You dont have authorized to this data" })
    }
}

module.exports = isAdmin
