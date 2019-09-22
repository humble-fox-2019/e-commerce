require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const database = 'mongodb+srv://ayusudi:ayusudi@cluster0-acddn.mongodb.net/e-commerce?retryWrites=true&w=majority'
// const database = 'mongodb://localhost:27017/e-commerce'
const index = require('./routes')
const errHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', index)

mongoose.connect(database, {
  useNewUrlParser : true, useUnifiedTopology: true 
}, function(err){
  if(err) {
    console.log(err)
    console.log(`server isn't connect to mongodb`);
  }
  else {
    console.log('Connected!');
  }
})

app.use(errHandler)

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})

module.exports = app
