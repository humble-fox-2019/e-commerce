var chai = require('chai')
var assert = require('assert');
var chaiHttp = require('chai-http');
var expect = chai.expect
const app = require('../app')
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdmNmI0OTg1MDRhZTAyZjczYzU0Y2IiLCJuYW1lIjoiT3duZXIiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTY4Njg0MzI5fQ.ddzq-qDXqPryCq-rYiHTpDPyDzyIo8IEILtaxt8SDv4'

chai.use(chaiHttp)


// describe('Create Product', function () {
//   describe('post /products/create', function () {
//     it('response should  be object and status 201', function (done) {
//       let newProduct = {
//         productName: 'Mochi Muji',
//         image: 'mochi.jpg',
//         category: 'food',
//         price: 40000,
//         stock: 5
//       }
//       chai.request(app)
//         .post('/products/create')
//         .set('token', token)
//         .send(newProduct)
//         .end(function (err, res) {
//           expect(err).to.be.null
//           expect(res).to.have.status(201);
//           expect(res).to.be.an('object')
//           expect(res.body.data).to.have.property('productName')
//           expect(res.body.data).to.have.property('image')
//           expect(res.body.data).to.have.property('category')
//           expect(res.body.data).to.have.property('price')
//           expect(res.body.data).to.have.property('stock')
//           done()
//         })
//     });
//   });
// });

// describe('Fail Create', function () {
//   describe('post /products/create', function () {
//     it (`response should be an object and status 400`, function(done){
//       let failInput = {
//         productName : 'Lobubulo'
//       }
//       chai.request(app)
//       .post('/products/create')
//       .set('token', token)
//       .send(failInput)
//       .end(function(err, res){
//         expect(res).to.have.status(400)
//         done()
//       })
//     })
//   });
// });

// describe('Destroy Product', function () {
//   describe(`delete /products/:id`, function () {
//     it(`response should be an object with status 200`, function (done) {
//       let deleteThis = '5d803c4012d65223b6fee787'
//       chai.request(app)
//         .delete(`/products/${deleteThis}`)
//         .set('token', token)
//         .end(function (err, res) {
//           expect(err).to.be.null
//           expect(res).to.have.status(200)
//           expect(res).to.be.an('object')
//           done()
//         })
//     })
//   })
// })