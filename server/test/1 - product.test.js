const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
const mongoose = require('mongoose')

const token = require('./0 - user.test')

chai.use(chaiHttp)
let userToken = ''
let invalidToken = 'eyJpZCI6IjVkN2Y5YjZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI'
let id = ''

describe('Product /products', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/e-commerce-test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function () {
      mongoose.connection.db.dropDatabase(function () {
        done()
      })
    })
  })

  // before(function () {
  //   describe('Pre Test Register', function () {
  //     it('create a account for test', function (done) {
  //       chai.request(app)
  //         .post('/users/register')
  //         .send({
  //           email: 'buzz@gmail.com',
  //           password: '123456'
  //         })
  //         .end(function (err, res) {
  //           // console.log(res.body.user)
  //           expect(err).to.be.null
  //           expect(res).to.have.status(201)
  //           // expect(res.body.user).to.have.property('email')
  //           // expect(res.body.user).to.have.property('password')
  //           // expect(res.body.user.password).to.not.equal('123456')
  //           // expect(res.body).to.have.property('token')
  //           userToken = res.body.token
  //           done()
  //         })
  //     })
  //   })
  // })

  describe('Create Product POST /products/', function () {
    it('Pre-test create account', function (done) {
      chai.request(app)
        .post('/users/register')
        .send({
          email: 'buzz@gmail.com',
          password: '123456'
        })
        .end(function (err, res) {
          // console.log(res.body.user)
          expect(err).to.be.null
          expect(res).to.have.status(201)
          // expect(res.body.user).to.have.property('email')
          // expect(res.body.user).to.have.property('password')
          // expect(res.body.user.password).to.not.equal('123456')
          // expect(res.body).to.have.property('token')
          userToken = res.body.token
          done()
        })
    })

    it('should not create a product with blank string in name field', function (done) {
      chai.request(app)
        .post('/products')
        .set('token', userToken)
        .send({
          name: '',
          stock: 5
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.include('Name is required')
          done()
        })
    })

    it('should not create a product with blank string in stock field', function (done) {
      chai.request(app)
        .post('/products')
        .set('token', userToken)
        .send({
          name: 'Fender Stratocaster',
          stock: ''
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.include('Stock is required')
          done()
        })
    })

    it('should not create a product without JWT in headers', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: 'Fender Stratocaster',
          stock: ''
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
          done()
        })
    })

    it('should not create a product with invalid JWT in headers', function (done) {
      chai.request(app)
        .post('/products')
        .set('token', invalidToken)
        .send({
          name: 'Fender Stratocaster',
          stock: ''
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
          done()
        })
    })

    it('should create a product', function (done) {
      chai.request(app)
        .post('/products')
        // TODO
        .set('token', userToken)
        .send({
          name: 'Fender Stratocaster',
          stock: 5
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('product')
          id = res.body.product._id
          done()
        })
    })

    describe('List All Products GET /products/', function () {
      it('should not show products without JWT in headers', function (done) {
        chai.request(app)
          .get('/products')
          // .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y5YjJlNTgzZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
          .end(function (err, res) {
            // console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors').to.include('jwt must be provided')
            done()
          })
      })

      it('should not show products with invalid JWT in headers', function (done) {
        chai.request(app)
          .get('/products')
          .set('token', invalidToken)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors').to.include('jwt malformed')
            done()
          })
      })

      it('should show all products', function (done) {
        chai.request(app)
          .get('/products')
          .set('token', userToken)
          .end(function (err, res) {
            // console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('products')
            done()
          })
      })
    })

    describe('Get Single Product', function () {
      it('should not show product without jwt', function (done) {
        chai.request(app)
          .get(`/products/${id}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
            done()
          })
      })

      it('should not show product with invalid jwt', function (done) {
        chai.request(app)
          .get(`/products/${id}`)
          .set('token', invalidToken)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
            done()
          })
      })

      it('should show single product', function (done) {
        chai.request(app)
          .get(`/products/${id}`)
          .set('token', userToken)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('product')
            done()
          })
      })
    })

    describe('Update Single Product', function () {
      it('should not update single product name without jwt', function (done) {
        chai.request(app)
          .put(`/products/${id}`)
          .send({
            name: 'Fender Stratocaster',
            stock: 50
          })
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
            done()
          })
      })

      it('should not update single product detail with invalid jwt', function (done) {
        chai.request(app)
          .put(`/products/${id}`)
          .set('token', invalidToken)
          .send({
            name: 'Fender Stratocaster',
            stock: 50
          })
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
            done()
          })
      })

      it('should update single product detail with valid jwt', function (done) {
        chai.request(app)
          .put(`/products/${id}`)
          .set('token', userToken)
          .send({
            name: 'Fender Stratocaster',
            stock: 5
          })
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('product')
            done()
          })
      })

      // it('should update single product detail if stock < 0', function (done) {
      //   chai.request(app)
      //     .put(`/products/${id}`)
      //     .set('token', userToken)
      //     .send({
      //       name: 'Fender Stratocaster',
      //       stock: -1
      //     })
      //     .end(function (err, res) {
      //       expect(err).to.be.null
      //       expect(res).to.have.status(400)
      //       expect(res.body).to.have.property('errors')
      //       done()
      //     })
      // })
    })

    describe('Delete Product DELETE /products/:id', function () {
      it('should not delete product without jwt', function (done) {
        chai.request(app)
          .delete(`/products/${id}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
            done()
          })
      })

      it('should not delete product with invalid jwt', function (done) {
        chai.request(app)
          .delete(`/products/${id}`)
          .set('token', invalidToken)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
            done()
          })
      })

      it('should delete product with valid jwt', function (done) {
        chai.request(app)
          .delete(`/products/${id}`)
          .set('token', userToken)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('product')
            done()
          })
      })
    })
  })
})