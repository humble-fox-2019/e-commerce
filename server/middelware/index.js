const jwt = require('jsonwebtoken');
const { TokenVerify} = require('../helpers/token')
// const { Todo } = require('../Models')
const { User ,  transaction } = require('../models')
module.exports = {
    VerifyToken : (token)=>{
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.decoded = decoded
          } catch(err) {
            
          }
    },
    Authenthication : (req,res,next)=>{
        try {
          const decoded = TokenVerify(req.headers.token)
          req.decode = decoded;
          next()
        }catch (err){
          res.status(403).json({
            message : "anda tidak memilik akses"
          })
        }
    }
    ,
    AuthorizedAdmin : (req,res,next)=>{
      if(req.decode.data.email != 'master@mail.com'){
        next({
          status : 403,
          message : "Maaf Anda Bukan Admin !!!"
        })
      }
      else {  
        next()
      }
    },
    AuthorizedUser : (req,res,next) =>{
      transaction.findOne({
        _id : req.params.id,
        User : req.decode.data._id
      })
      .then(data=>{
        if(data || req.decode.data.email == 'master@mail.com'){
          next()
        }else{
          next({
            status : 403,
            message : "Maaf Anda Tidak Memilik Akses"
          })
        }
      })
      .catch(err=>{
        next({
          status : 500
        })
      })
    }
    // Authorized : (req,res,next)=>{
    //   User.findOne({
    //     _id : req.params.id
    //   })
    //   .then(user=>{
    //     console.log(' sampai di authorized middelware' , user , '<<<<<===========')
    //     if(user){
    //       next()
    //     }else {
    //       res.status(403).json({
    //         message : "You don't have access"
    //       })
    //     }
    //   })
    //   .catch(err=>{
    //     next(err)
    //   })
    // }
}