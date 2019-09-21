// const app = require('../app')
// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const { expect } = chai
// const mongoose = require('mongoose')

// chai.use(chaiHttp)

// describe('Cart /carts/', function () {
//   before(function (done) {
//     mongoose.connect('mongodb://localhost/e-commerce-test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function () {
//       mongoose.connection.db.dropDatabase(function () {
//         done()
//       })
//     })
//   })

//   describe('Create Cart POST /carts/', function () {
//     it('should not create a cart without jwt', function (done) {
//       chai.request(app)
//         .post('/carts')
//         .end(function (err, res) {
//           console.log(res.body, 'ini res body')
//           expect(err).to.be.null
//           expect(res).to.have.status(400)
//           expect(res.body).to.have.property('errors')
//           done()
//         })
//     })

//     it('should not create with invalid jwt', function (done) {
//       chai.request(app)
//         .post('/carts')
//         .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
//         .end(function (err, res) {
//           expect(err).to.be.null
//           expect(res).to.have.status(400)
//           expect(res.body).to.have.property('errors')
//           done()
//         })
//     })

//     it('should create with valid jwt', function (done) {
//       chai.request(app)
//         .post('/carts')
//         .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y5YjJlNTgzZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
//         .end(function (err, res) {
//           expect(err).to.be.null
//           expect(res).to.have.status(201)
//           expect(res.body).to.have.property('cart')
//           done()
//         })
//     })
//   })
// })