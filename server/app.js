if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHnadler')
const app = express()

const PORT = process.env.PORT || 3000
app.use(cors())

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

mongoose.connect(`${process.env.BASE_URL}${process.env.NODE_ENV == 'test' ? 'test' : ""}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log(`MongoDB Connected Success`)
    })
    .catch(err => {
        console.log(err)
        console.log(`MongoDB Connected Failed`)
    })

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running On PORT ${PORT}`)
})

module.exports = app