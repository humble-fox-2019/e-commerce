const bcrypt = require('bcryptjs')


function hashPassword(params) {
    // console.log('<<< MASUK KE HASH')
    console.log(params, '<< INI ISINYA PARAMS')
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(params, salt)
    console.log(hash, '<<< INI HASH PASSWORDNYA')
    // console.log(password, '<<<<< PASSWORD HASIL DI HASH')
    // console.log(password, '<<< INI ADALAH PASSWORD YG SUDAH DI HASH DARI HELPER HASH PASSWORD')
    return hash
}

function checkHash(params, counter) {
    const check = bcrypt.compareSync(params, counter)
    return check
}

module.exports = {
    hashPassword,
    checkHash
}