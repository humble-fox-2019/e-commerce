const bcrypt = require('bcryptjs');
const SALT = bcrypt.genSaltSync(10);

module.exports = {
    hashPasword(password) {
        return bcrypt.hashSync(password, SALT)
    },

    comparePassword(password, hashedPw) {
        return bcrypt.compareSync(password, hashedPw);
    }
}