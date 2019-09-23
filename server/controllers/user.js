const User = require ('../models/user')
const { generateToken } = require ('../helpers/jwt')

class UserController {

    static register(req,res,next){
        User.create({
            email : req.body.email,
            password : req.body.password
        })
        .then ((user)=>{
            console.log(user._id)
            const payload = {
                id : user._id,
                email : user.email
            }
            const token = generateToken(payload)
            res.status(200).json({
                userId : user._id,
                token
            })
        })
        .catch (next)
    }

    static read(req,res,next){
        User.find().then((users)=>{
            res.status(200).json({
                users
            })
        })
        .catch (next)
    }

    static login(req,res,next){
        const payload = {
            id : req.user._id,
            email : req.user.email
        }
        const token = generateToken(payload)
        res.status(200).json({
            userId : req.user._id,
            token
        })
    }

    static patch(req,res,next){
        const updatedUser = {
            email : req.body.email,
            password : req.body.password
        }
        const options = {
            new : true,
            omitUndefined : false
        }
        User.findByIdAndUpdate({ _id : req.params.id }, updatedUser, options )
        .then(()=>{
            res.status(200).json({
                message : 'success updating'
            })
        })
        .catch(next)
    }

    static delete(req,res,next){
        User.findByIdAndDelete({ _id: req.params.id }).then(()=>{
            res.status(200).json({
                message : "user deleted"
            })
            .catch(next)
        })
    }
}

module.exports = UserController