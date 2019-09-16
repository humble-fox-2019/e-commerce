const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
const mongoose = require('mongoose')

chai.use(chaiHttp)

describe('Product', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/e-commerce-test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function () {
      mongoose.connection.db.dropDatabase(function () {
        done()
      })
    })
  })

  describe('List All Products', function () {
    it('should show all products object', function () {
      chai.request(app)
        .get('/products')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
        })
    })

    it('should return product object', function () {
      chai.request(app)
        .post('/products')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect()
        })
    })
  })
})