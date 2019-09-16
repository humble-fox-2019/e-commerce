var mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
let expect = chai.expect;

let myToken = '';

describe('Authentication', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            console.log('db dropped');
            // process.exit(0);
            done()
        });
    });

    describe('registration', function () {
        it('Registration without error', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    expect(res.body).have.property('name');
                    expect(res.body).have.property('email');
                    expect(res.body).have.property('role');
                    expect(res.body.name).equal('candra saputra');
                    expect(res.body.role).equal('customer');
                    expect(res).have.status(201);
                    done();
                })
        });

        it('Error email has beem used', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    expect(res.body.message).to.have.members(['Email has been used']);
                    res.should.have.status(400);
                    done();
                })
        });

        it('Error email and password format', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra', password: 'password' })
                .end(function (req, res, next) {
                    expect(res.body.message).to.have.members(['Invalid Email', 'Password must contain at least one letter, one number, and minimum six characters']);
                    res.should.have.status(400);
                    done();
                })
        });
    })

    describe('login', function () {
        it('Login without error', function (done) {
            chai.request(app)
                .post('/login')
                .send({ email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    myToken = res.body.access_token;
                    expect(res.body).have.property('access_token');
                    expect(res.body).have.property('userData');
                    expect(res.body.userData).to.include.keys(['id', 'name', 'email', 'role']);
                    expect(res).have.status(200);
                    done();
                })
        });

        it('Error email and password required', function (done) {
            chai.request(app)
                .post('/login')
                .send({ email: '', password: '' })
                .end(function (req, res, next) {
                    expect(res.body).have.property('message');
                    expect(res.body.message).to.have.members(['email is required', 'password is required']);
                    expect(res).have.status(400);
                    done();
                })
        });

        it('email/password not found', function (done) {
            chai.request(app)
                .post('/login')
                .send({ email: 'candra@mail.com', password: 'password123' })
                .end(function (req, res, next) {
                    expect(res.body).have.property('message');
                    expect(res.body.message).to.have.members(['email/password not found']);
                    expect(res).have.status(400);
                    done();
                })
        });
    })
})