const jwt = require('jsonwebtoken');
const secret = process.env.RAHASIA

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, secret, {
            expiresIn: 3600 * 60
        });
    },

    verifyToken(token) {
        return jwt.verify(token, secret)
    }
}