const mongoose = require('mongoose')


mongoose.connect('mongodb://SultanRH32:nasipadang123@cluster0-shard-00-00-jw2ud.mongodb.net:27017,cluster0-shard-00-01-jw2ud.mongodb.net:27017,cluster0-shard-00-02-jw2ud.mongodb.net:27017/myDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }, () => {

})
.then(data => {
    console.log('sukses')
})
.catch(err => {
    console.log(err, ' ========')
})


// mongoose.connect(`mongodb://localhost:27017/e-commerce`, {useNewUrlParser: true},()=>{

// })
// .then(data => {
//     console.log('sukses')
// })
// .catch(err => {
//     console.log(err, ' ========')
// })





// mongoose.connect('mongodb+srv://SultanRH32:nasipadang123@cluster0-jw2ud.mongodb.net/myDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {

// })