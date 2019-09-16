const bcrypt = require('bcryptjs');
const SALT = process.env.SALT;

module.exports = {
    hashPasword(password) {
        return bcrypt.hashSync(password, SALT)
    },

    comparePassword(password, hashedPw) {
        return bcrypt.compareSync(password, hashedPw);
    }
}