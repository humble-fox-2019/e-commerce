const NODE_ENV = process.env.NODE_ENV;
if ( NODE_ENV ) 
    require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product')




const PORT = process.env.PORT;

let DATABASE_URL = process.env.DATABASE_URL;
if ( NODE_ENV == 'test') 
    DATABASE_URL = process.env.DATABASE_TEST_URL

mongoose.connect( DATABASE_URL , {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false })
.then( () => { console.log( 'Database connected to : ' + DATABASE_URL ); })
.catch ( err =>{  console.log( 'Database failed to connect... ') })

const app = express();

app.use( cors() );
app.use( express.urlencoded({ extended : true }))
app.use( express.json() );

app.use('/' , userRouter );
app.use('/products' , productRouter )


app.use( errorHandler )




app.listen( PORT , () => {
    console.log( 'App Listening on PORT : ' + PORT )
})

module.exports = app;