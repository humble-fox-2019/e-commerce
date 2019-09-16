const mongoose = require('mongoose')
const MONGO_URI = `mongodb+srv://josprima:28jos1997@cluster0-mblvo.gcp.mongodb.net/ecommerce-${process.env.NODE_ENV}?retryWrites=true&w=majority`


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(
    () => { console.log('Success connect to database') },
    err => { console.log('Failed connect to database' + err.message) }
)


