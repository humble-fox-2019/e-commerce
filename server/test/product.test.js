// const chai = require('chai')
// const chaiHTTP = require('chai-http')
// const app = require('../app')
// const Product = require('../models/Product')
// const Store = require('../models/Store')
// const fs = require('fs')

// const expect = chai.expect
// chai.use(chaiHTTP)


// let storeId = null
// let token = null

// before(function(done) {
//   Store.create({
//     name: 'pt maju mundur',
//     email: 'majua@gmail.com',
//     password: 'maju123',
//     city: 'Medan',
//     province: 'Sumatera utara'
//   })
//   .then(store => {
//     storeId = store._id
//     console.log('Store created successfully')
//     done()
//   })
//   .catch(console.log)
// })

// after(function(done) {
//   if(process.env.NODE_ENV === 'test') {
//       Store.deleteMany({})
//         .then(_ => {
//             console.log('Store testing data deleted successfully')
//             return Product.deleteMany({})
//         })
//         .then( _ => {
//           console.log('Product testing data deleted successfully')
//           done()
//         })
//         .catch(console.log)
//     }
// })


// describe('Product Model Test', function() {
//   describe('POST - Create a product', function() {
//     it('Should return object product that created', function(done) {
//       chai.request(app)
//         .post('/product')
//         .attach('image', fs.readFileSync('./test/test.jpg'), 'test.jpg')
//         .send({
//           name: 'Laptop Asus',
//           description: 'Laptop asus description',
//           price: 2000000,
//           stock: 20,
//           store: storeId
//         })
//         .end(function(err, res) {
//           console.log(res.body, '<<<<<<<<<<<<<<')
//         })
//     })
//   })
// })
