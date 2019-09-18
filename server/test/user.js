// var assert = require('assert');
// var chai = require('chai')
// var chaiHttp = require('chai-http');
// var expect = chai.expect
// const app = require('../app')

// chai.use(chaiHttp)


// describe('Create User', function () {
//     describe('post users/create', function () {
//         it('response should be object and status is 200', function (done) {
//             let newUser = {
//                 name: 'Median',
//                 address: 'Bintaro Sektor 1 Jakarta Selatan',
//                 email: 'hellooo@mail.com',
//                 password: 'none12345',
//                 role: 'customer'
//             }
//             chai.request(app)
//                 .post('/users/create')
//                 .send(newUser)
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.be.an('object')
//                     expect(res).to.have.status(200)
//                     expect(res.body.data).to.have.property('name')
//                     expect(res.body.data).to.have.property('address')
//                     expect(res.body.data).to.have.property('email')
//                     expect(res.body.data).to.have.property('password')
//                     done()
//                 })
//         })
//     })
// })

// describe('Fail Create', function(){
//   describe('post users/create', function(){
//     it('response should be 400 with validation', function(done){
//       let failInput = {
//         mail : 'sdfghjklkjhg@@.cooom.c'
//       }
//       chai.request(app)
//       .post('/users/create')
//       .send(failInput)
//       .end(function(err, res){
//         expect(res).to.be.an('object')
//         expect(res).to.have.status(400)
//         done()
//       })
//     })
//   })
// })

// ----------------------------------------------------

// describe('Login User', function () {
//     describe('post users/login', function () {
//         it(`response should be object with status 200`, function (done) {
//             let login = {
//                 email: 'admin@mail.com',
//                 password: 'none12345'
//             }
//             chai.request(app)
//                 .post('/users/login')
//                 .send(login)
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.be.an('object')
//                     expect(res).to.have.status(200)
//                     done()
//                 })
//         })
//     })
// })

// describe('Wrong Password', function () {
//     describe('post users/login', function () {
//         it(`response should be object with status 400`, function (done) {
//             let login = {
//                 email: 'admin@mail.com',
//                 password: 'none1234'
//             }
//             chai.request(app)
//                 .post('/users/login')
//                 .send(login)
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.be.an('object')
//                     expect(res).to.have.status(400)
//                     done()
//                 })
//         })
//     })
// })

// describe('Empty Input', function () {
//     describe('post users/login', function () {
//         it(`response should be object with status 400`, function (done) {
//             chai.request(app)
//                 .post('/users/login')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.be.an('object')
//                     expect(res).to.have.status(400)
//                     done()
//                 })
//         })
//     })
// })