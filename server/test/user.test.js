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
    })
})

