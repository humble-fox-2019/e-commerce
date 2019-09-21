

module.exports = (req, res, next)=>{
    if(req.decode.username === 'admin'){
        next()
    }else{
        next({status: 403, message: "you don't have the authority to do this action"})
    }
}