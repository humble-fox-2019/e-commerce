function errorHandler ( err , req ,res , next ) {
    console.log("SERVER ERROR")
    console.log ( err );
    console.log()
    console.log()
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';

    if ( err.name == 'MongoError' ){
        if ( err.errmsg.includes('duplicate') ) {
            status = 400;
            if ( err.errmsg.includes('username' ))
                message = ["Username already registered"]
            else if( err.errmsg.includes('email') ) 
                message = ["Email already registered"]
        }
    } 
    if ( err.errors ) {
        const errorMessage = [];
        for ( key in err.errors ) {
            errorMessage.push( err.errors[key].message );
        }
        message = errorMessage
    }
    
    res.status( status ).json( message );
}

module.exports = errorHandler
