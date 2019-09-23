require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(_ => {
        console.log('berhasil masuk ke database')
    })



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const userRouter = require('./routes/user')
const productUser = require('./routes/product')

app.use('/user', userRouter)
app.use('/product', productUser)

app.listen(port, () => {
    console.log(`Connected to Port ${port}`)
})

module.exports = app