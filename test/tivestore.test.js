var mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
let expect = chai.expect;

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

        it('Error email and password format', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    console.log(res.body.message);
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
                    console.log(res.body.message);
                    expect(res.body.message).to.have.members(['Invalid Email', 'Password must contain at least one letter, one number, and minimum six characters']);
                    res.should.have.status(400);
                    done();
                })
        });
    })
})