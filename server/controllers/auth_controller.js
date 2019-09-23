const { User } = require('../models')
const { Token } = require('../helpers/token')
const { ComparePassword } = require('../helpers/password')
class AuthController {
    static Register (req,res,next){
        let { username ,  password , email } = req.body
        User.create({
            username ,  password ,  email
        })
        .then(user=>{
            res.status(201).json({
                token : Token(user),
                user , 
                message : 'sukses add data'
            })
        })
        .catch(err=>{next(err)})
    }

    static Login(req,res,next){
        let {  email , password } = req.body
        // console.log('sukses login')
        let kondisi = false
        User.findOne({
            email 
        })
        .then(user=>{
            if(user){
                if(ComparePassword(user.password , password)){
                    kondisi = true
                    if(user.email == 'master@mail.com'){
                        res.status(201).json({
                            token : Token(user) , admin : true
                        })    
                    }else {
                        res.status(200).json({
                            token : Token(user) , message : 'sukses Login' , user
                        })
                    }
                }else {
                    next({
                        status : 400,
                        message : 'Email or Password Not Found'
                    })
                }
            }else {
                next({
                    status : 400,
                    message : 'Email or Password Not Found'
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static RegisterGoogle(req,res,next){
        let data;
        let kondisi = true
        const client = new OAuth2Client("438390530813-hqkaes7ruh8js6eoc2r6cleest6jgqrh.apps.googleusercontent.com");
        client.verifyIdToken({
            idToken : req.body.id_token ,
            audience :  "438390530813-hqkaes7ruh8js6eoc2r6cleest6jgqrh.apps.googleusercontent.com"
        })
        .then(ticket=>{
            data = ticket.payload
            return User.findOne({
                email : data.email
            })
        })
        .then(user=>{
            if(user){
                kondisi = false
                let tokenUser = Token(user._id)
                res.json({
                    token : tokenUser,
                    name : user.name
                })
            }else {
                let { name , email } = data
                return User.create({
                    name , email , password : 'asal'
                })
            }
        })
        .then(data2=>{
            if(kondisi){
                res.status(201).json({
                    token : Token(data2),
                    data2,
                    message : 'sukses add data'
                })
            }
        })
        .catch(err=>{
            next(err)    
        })
    }

    static checkAdmin (req,res,next){
        console.log(req.decode.data.email , ' <disini yaaa')
        if(req.decode.data.email == 'master@mail.com'){
          res.json({
              admin : true
          })
        }
        else {  
            res.json({
                user : true
            })
        }
    }
}

module.exports = AuthController