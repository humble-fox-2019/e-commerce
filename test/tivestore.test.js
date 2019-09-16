var mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require("../models/user");

chai.use(chaiHttp);
let expect = chai.expect;

let memberToken = '';
let adminToken = '';

describe('Authentication', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            console.log('db dropped');
            let name = 'candra be';
            let email = 'candrabe@gmail.com';
            let password = 'password123';
            let role = 'admin';

            User.create({ name, email, password, role })
                .then(result => {
                    done();
                });
        });
    });

    describe('registration', function () {
        it('Registration without error', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('role');
                    expect(res.body.name).to.equal('candra saputra');
                    expect(res.body.role).to.equal('customer');
                    expect(res).to.have.status(201);
                    done();
                })
        });

        it('Error email has beem used', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    expect(res.body.message).to.have.members(['Email has been used']);
                    expect(res).to.have.status(400);
                    done();
                })
        });

        it('Error email and password format', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra', password: 'password' })
                .end(function (req, res, next) {
                    expect(res.body.message).to.have.members(['Invalid Email', 'Password must contain at least one letter, one number, and minimum six characters']);
                    expect(res).to.have.status(400);
                    done();
                })
        });
    })

    describe('login', function () {
        it('Login member without error', function (done) {
            chai.request(app)
                .post('/login')
                .send({ email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    memberToken = res.body.access_token;
                    expect(res.body).to.have.property('access_token');
                    expect(res.body).to.have.property('userData');
                    expect(res.body.userData).to.include.keys(['id', 'name', 'email', 'role']);
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('Login admin without error', function (done) {
            chai.request(app)
                .post('/login')
                .send({ email: 'candrabe@gmail.com', password: 'password123' })
                .end(function (req, res, next) {
                    adminToken = res.body.access_token;
                    expect(res.body).to.have.property('access_token');
                    expect(res.body).to.have.property('userData');
                    expect(res.body.userData).to.include.keys(['id', 'name', 'email', 'role']);
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('Error email and password required', function (done) {
            chai.request(app)
                .post('/login')
                .send({ email: '', password: '' })
                .end(function (req, res, next) {
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.have.members(['email is required', 'password is required']);
                    expect(res).to.have.status(400);
                    done();
                })
        });

        it('email/password not found', function (done) {
            chai.request(app)
                .post('/login')
                .send({ email: 'candra@mail.com', password: 'password123' })
                .end(function (req, res, next) {
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.have.members(['email/password not found']);
                    expect(res).to.have.status(400);
                    done();
                })
        });
    })
});

describe('products', function () {
    describe('Create product', function () {
        it('Create product without error', function (done) {
            done();
        });

        it('Error if not admin', function (done) {
            chai.request(app)
                .post('products')
                .send({})
                .set('access_token', memberToken)
                .end(function (res, req, next) {
                    expect(res.body.message).to.equal('You do not have access to data product');
                    expect(res).have.status(403);
                    done();
                });
        });

        it('Error required', function (done) {
            done()
        });

        it('Error format', function (done) {
            done()
        });
    });

    describe('Update product', function () {
        it('Update product without error', function (done) {
            done();
        });

        it('Error if not admin', function (done) {
            done()
        });

        it('Error invalid id', function (done) {
            done()
        });

        it('Error if no one input', function (done) {
            done()
        });

        it('Error format', function (done) {
            done()
        });
    });

    describe('Get a product', function () {
        it('Create product without error', function (done) {
            done();
        });

        it('Error invalid id', function (done) {
            done()
        });

        it('Error if data not found', function (done) {
            done()
        });
    });

    describe('Get all products', function () {
        it('Get all products without error', function (done) {
            chai.request(app)
                .get('products')
                .set('access_token', adminToken)
                .end(function (res, req, next) {
                    expect(res.body.products).must.be.an('array');
                    expect(res.body.products[0]).to.have.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error if data not found', function (done) {
            done()
        })
    });

    describe('Delete product', function () {
        it('Delete product without error', function (done) {
            done();
        });

        it('Error if not admin', function (done) {
            done()
        });

        it('Error invalid id', function (done) {
            done()
        });
    });
});

describe('Cart', function () {
    describe('Get my cart', function () {

    });

    describe('Add product to cart', function () {

    });

    describe('Remove product from cart', function () {

    });

    describe('Checkout', function () {

    });
});