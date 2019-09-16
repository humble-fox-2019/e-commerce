const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
const mongoose = require('mongoose')

chai.use(chaiHttp)

describe('Product /products', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/e-commerce-test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function () {
      mongoose.connection.db.dropDatabase(function () {
        done()
      })
    })
  })

  describe('Create Product POST /products/', function () {
    it('should not create a product with blank string in name field', function () {
      chai.request(app)
        .post('/products')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y5YjJlNTgzZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
        .send({
          name: '',
          stock: 5
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.include('Name is required')
        })
    })

    it('should not create a product with blank string in stock field', function () {
      chai.request(app)
        .post('/products')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y5YjJlNTgzZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
        .send({
          name: 'Fender Stratocaster',
          stock: ''
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.include('Stock is required')
        })
    })

    it('should not create a product without JWT in headers', function () {
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
        })
    })

    it('should not create a product with invalid JWT in headers', function () {
      chai.request(app)
        .post('/products')
        .set('token', 'eyJpZCI6IjVkN2Y5YjZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
        .send({
          name: 'Fender Stratocaster',
          stock: ''
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
        })
    })

    it('should create a product', function () {
      chai.request(app)
        .post('/products')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y5YjJlNTgzZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
        .send({
          name: 'Fender Stratocaster',
          stock: 5
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('product')
        })
    })

    describe('List All Products GET /products/', function () {
      it('should not show products without JWT in headers', function () {
        chai.request(app)
          .get('/products')
          // .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y5YjJlNTgzZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
          .end(function (err, res) {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
          })
      })

      it('should not show products with invalid JWT in headers', function () {
        chai.request(app)
          .get('/products')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('errors')
          })
      })

      it('should show all products', function () {
        chai.request(app)
          .get('/products')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y5YjJlNTgzZTE3ODU5OGMwZjQ0NSIsImVtYWlsIjoiYnV6ekBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDM4ODZ9.aOrdDEbJYKDTmPX8Ek9Xj4gCYdT2QFU4UIcNMmFTtsI')
          .end(function (err, res) {
            // console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('products')
          })
      })
    })

    describe('Get Single Product', function () {

    })
  })
})