function errorHandler(err, req, res, next) {
    console.log(`
      ---------- error begin ---------
  
      ${JSON.stringify(err, null, 2)}
      
      ----------- error end ----------
    `);

    //default
    let status = err.status || 500;
    let message = err.message || "internal server error";
    let type = "error";

    //validation error
    if (err.name === "ValidationError") {
      status = 400;
      let key = Object.keys(err.errors)[0];
      message = err.errors[key].message;
    }

    //final
    res.status(status).json({
      message,
      type
    });
}

module.exports = errorHandler