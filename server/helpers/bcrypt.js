const bcrypt = require ('bcryptjs')

function hashPassword (password) {
    const salt = bcrypt.genSaltSync(10)
    bcrypt.hash(password, salt).then((hash) =>{
        return hash
    }).catch ((err)=>{
        console.log(err)
    })
}

function compareHash (password, hash) {
    return bcrypt.compareSync(password,hash)
}

module.exports = { hashPassword, compareHash }