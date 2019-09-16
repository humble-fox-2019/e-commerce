const User = require('../models/user');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');


class UserController {
    static login ( req, res ,next ) {
        const { email , password } = req.body;
        User.findOne({ email })
        .then( found => {
            if ( found ) {
                const validPassword = compare( password , found.password ) ;
                if ( validPassword ) {
                    const payload = {
                        id : found._id,
                        email : found.email,
                        username : found.username
                    }
                    const token = generateToken(payload)
                    res.status(200).json({ token , user : payload });
                } else {
                    next({ message : "Invalid Email / Password" })
                }
            } else {
                next({ message : "Invalid Email / Password" })
            }
        })
        .catch( next );
    }
    static register( req ,res, next ){
        const { username , email , password } = req.body;
        User.create({ username , email , password })
        .then ( createdUser => {
            res.status(201).json({ createdUser });
        })
        .catch( next );
    }
}

module.exports = UserController