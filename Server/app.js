const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    require('dotenv').config()
}

const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    environment = NODE_ENV ? "-" + NODE_ENV : "",
    db = "FloatingOcean",
    url = process.env.URL || "mongodb://localhost:27017/",
    port = process.env.PORT || 3000,
    route = require('./routes'),
    errorHandler = require('./middleware/errorHandler'),
    cors = require('cors')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(url + db + environment, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB " + db + environment)
    }).catch((err) => {
        console.log(err);
        console.log("Failed to connect to MongoDB");
    });

app.use(cors())

app.use('/', route)

app.use(errorHandler)

console.log(__filename)

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app