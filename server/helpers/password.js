const bcrypt = require('bcryptjs');
module.exports = {
    HashingPassword: (password) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    },
    ComparePassword: (passwordDiDb, passwordInput) => {
        return bcrypt.compareSync(passwordInput, passwordDiDb);
    },
}