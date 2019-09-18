function errorHandler(err, req, res, next){
  let status;
  let error;
  if (err.status){
    status = err.status
    if (err.error){
      if(err.error.message){
        if(err.error.message.includes("validation")){
          let temp = []
          let cekErr = err.error.errors
          for (let k in cekErr){
            temp.push(cekErr[k].message)
          }
          error = temp
        }
      }
    }
    else {
      error = err.message
    }
  }
  else {
    status = 500
    error = 'Error Internal Server'
  }
  res.status(status).json({
    msg : error
  })
}

module.exports = errorHandler