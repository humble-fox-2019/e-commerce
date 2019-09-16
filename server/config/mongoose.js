const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(
    () => { console.log('Success connect to database') },
    err => { console.log('Failed connect to database' + err.message) }
)


