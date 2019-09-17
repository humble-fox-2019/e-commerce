const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    console.log(NODE_ENV);
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb://localhost/e-commerce${NODE_ENV === 'test' ? `-test` : ''}`, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        console.log('mongodb connected!');
    })
    .catch(err => {
        console.log('failed connect to mongodb!');
        console.log(err);
    })

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log('app listening on port', PORT));

module.exports = app;