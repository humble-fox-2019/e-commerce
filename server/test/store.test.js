const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const Store = require('../models/Store')

const expect = chai.expect
chai.use(chaiHTTP)


let newStore = {
    name: 'toko abadi jaya',
    email: 'abadi@gmail.com',
    password: 'abadi123',
    city: 'Medan',
    province: 'Sumatera utara'
}

let storeSignin = {
    email: newStore.email,
    password: newStore.password
}

before(function(done) {
    Store.create({
        name: 'pt maju mundur',
        email: 'maju@gmail.com',
        password: 'maju123',
        city: 'Medan',
        province: 'Sumatera utara'
    })
    .then(_ => {
        console.log('Store testing data created successfully')
        done()
    })
    .catch(console.log)
})

after(function(done) {
    if(process.env.NODE_ENV === 'test') {
        Store.deleteMany({})
            .then(_ => {
                console.log('Store testing data deleted successfully')
                done()
            })
            .catch(console.log)
    }
})

describe('Store Model test', function() {
    describe('POST /store/signup - Create store test', function() {
        it('should return object created store', function(done) {
            chai.request(app)
                .post('/store/signup')
                .send(newStore)
                .end(function(err, res) {
                    console.log(res.body,'<<<<<<<<<<<')
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('message', 'token')
                    expect(res.body.message).to.equal('success open store')
                    done()
                })
        })
        it('should return error status 400 because store data not send', function(done) {
            chai.request(app)
                .post('/store/signup')
                .send()
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object').to.have.key('errors')
                    expect(res.body.errors).to.be.an('array')
                    expect(res.body.errors).to.include('name required')
                    expect(res.body.errors).to.include('email required')
                    expect(res.body.errors).to.include('password required')
                    expect(res.body.errors).to.include('city required')
                    expect(res.body.errors).to.include('province required')
                    done()
                })
        })
        it('should return error status 400 because email not valid', function(done) {
            chai.request(app)
                .post('/store/signup')
                .send({
                    name: 'abcd',
                    email: 'gmail.com',
                    password: 'abc123',
                    city: 'Medan',
                    province: 'Sumatera utara'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object').to.have.key('errors')
                    expect(res.body.errors).to.be.an('array')
                    expect(res.body.errors).to.include('invalid email')
                    done()
                })
        })
    })
    describe('POST /store/signin - Login store test', function() {
        it('should return token and success status 200', function(done) {
            chai.request(app)
                .post('/store/signin')
                .send({
                    email: 'maju@gmail.com',
                    password: 'maju123'
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object').to.have.any.keys('message', 'token')
                    expect(res.body.message).to.equal('success signin')
                    expect(res.body.token).to.be.a('string')
                    done()
                })
        })
        it('should return error status 400 because user not send data', function(done) {
            chai.request(app)
                .post('/store/signin')
                .send()
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object').to.have.key('errors')
                    expect(res.body.errors).to.be.an('array').include('email required')
                    expect(res.body.errors).to.be.an('array').include('password required')
                    done()
                })
        })
        it('should return error status 401 because wrong email/password', function(done) {
            chai.request(app)
                .post('/store/signin')
                .send({
                    email: 'apa@gmail.com',
                    password: 'apaapa'
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object').to.have.key('errors')
                    expect(res.body.errors).to.be.an('array').include('wrong email/password')
                    done()
                })
        })
    })
})

