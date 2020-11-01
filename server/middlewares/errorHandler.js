
module.exports = {
    errorHandler(err, req, res, next) {
        // console.log(err)
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';

        if (err.name === 'ValidationError') {
            let errors = [];

            for (let key in err.errors) {
                errors.push(err.errors[key].message)
            }
    
            // console.log(errors, '========== dari error handler')

            res.status(400).json({
                errors
            });
        } else if (err.name === 'CastError') {
            // console.log(err)

            if (err.message.includes("Product")) {
                res.status(400).json({
                    errors: ["Product ID is not valid"]
                })
            } else if ( err.message.includes("Transaction")) {
                res.status(400).json({
                    errors: ["Transaction ID is not valid"]
                })
            } 
            else {
                res.status(400).json({
                    errors: ["Cart ID is not valid"]
                })
            }
        } else {
            res.status(status).json({
                errors: [message]
            });
        }
        
    }
}