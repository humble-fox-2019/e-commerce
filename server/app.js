
if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const errorHandling = require('./middelware/errorHandling')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ useNewUrlParser: true  }))

require('./config/connection')

app.use('/', routes)
app.use(errorHandling)

module.exports = app