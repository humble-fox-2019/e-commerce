const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const User = require('../models/User')

const expect = chai.expect
chai.use(chaiHTTP)


let newUser = {
    username: 'user',
    email: 'user@gmail.com',
    password: 'user123'
}

let userSignin = {
    email: newUser.email,
    password: newUser.password
}

after(function(done) {
    if(process.env.NODE_ENV === 'test') {
        User.deleteMany({})
            .then(_ => {
                console.log('User testing data deleted successfully')
                done()
            })
            .catch(console.log)
    }
})

describe('User Model test', function() {
    describe('POST /users/signup - Create user test', function() {
        it('should return object created user', function(done) {
            chai.request(app)
                .post('/user/signup')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('message', 'token')
                    expect(res.body.message).to.equal('success signup')
                    done()
                })
        })
        it('should return error status 400 because user not send', function(done) {
            chai.request(app)
                .post('/user/signup')
                .send()
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object').to.have.key('errors')
                    expect(res.body.errors).to.be.an('array')
                    expect(res.body.errors).to.include('username required')
                    expect(res.body.errors).to.include('email required')
                    expect(res.body.errors).to.include('password required')
                    done()
                })
        })
        it('should return error status 400 because username not valid', function(done) {
            chai.request(app)
                .post('/user/signup')
                .send({
                    username: 'abc',
                    email: 'test@gmail.com',
                    password: 'abc123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object').to.have.key('errors')
                    expect(res.body.errors).to.be.an('array')
                    expect(res.body.errors).to.include('username minimal 4 characters')
                    done()
                })
        })
        it('should return error status 400 because email not valid', function(done) {
            chai.request(app)
                .post('/user/signup')
                .send({
                    username: 'abcd',
                    email: 'gmail.com',
                    password: 'abc123'
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
})

