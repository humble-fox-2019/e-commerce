const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHTTP)

describe('POST /users/register', () => {
    const user = {
        username: "testingProper",
        email: "testing@test.com",
        password: "12345678"
    }

    const wrongCredentials = {}
    describe('Success Create New User', function () {
        it('#create(req, res, next)', function (done) {
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body.username).to.equal(user.username);
                        expect(res.body.email).to.equal(user.email);
                        expect(res.body.password).to.not.equal(user.password);
                        done();
                    }
                });
        });
    });
    describe('Fail create new user', function () {
        it('#create(req, res, next)', function (done) {
            chai.request(app)
                .post('/users/register')
                .send(wrongCredentials)
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('array');
                        expect(res.body.every(el => typeof el === 'string')).to.be.true
                        done()
                    }
                })
        })
    })
})

describe('POST /users/login', () => {
    const user = {
        identity: "testingProper",
        password: "12345678"
    }
    const wrongCredentials = {
        identity: "testingProper1",
        password: "123456789"
    }

    describe('Login Test', () => {
        it('#login(req, res, next)', function (done) {
            chai.request(app)
                .post('/users/login')
                .send(user)
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object')
                        expect(res.body.password).to.not.exist;
                        expect(res.body.token).to.exist;
                        done()
                    }
                })
        })
    })

    describe('Fail Login Test', () => {
        it('#login(req, res, next)', function (done) {
            chai.request(app)
                .post('/users/login')
                .send(wrongCredentials)
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(401);
                        expect(res.body).to.be.a('string');
                        expect(res.body).to.match(/(Wrong Username|Wrong Email|Wrong Password)/gi);
                        done()
                    }
                })
        })
    })
})