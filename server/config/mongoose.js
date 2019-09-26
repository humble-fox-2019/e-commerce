const mongoose = require('mongoose')
const MONGO_URI = `mongodb://localhost:27017/ecommerce-${process.env.NODE_ENV}`


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(
    () => { console.log('Success connect to database') },
    err => { console.log('Failed connect to database' + err.message) }
)


