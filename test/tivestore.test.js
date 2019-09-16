const mongoose = require('mongoose');
const fs = require('fs');

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

let productId;
describe('products', function () {
    describe('Create product', function () {
        it('Create product without error', function (done) {
            chai.request(app)
                .post('products')
                .set('access_token', adminToken)
                .send({
                    name: 'addidas New Hammer sole for Sports person',
                    price: 1200000,
                    description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.',
                    category: 'Household',
                    stock: 40
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    productId = res.body._id;

                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res.body.name).equal.to('addidas New Hammer sole for Sports person');
                    expect(res.body.price).equal.to(1200000);
                    expect(res).have.status(201);
                    done();
                });
        });

        it('Error if not admin', function (done) {
            chai.request(app)
                .post('products')
                .set('access_token', memberToken)
                .send({
                    name: 'addidas New Hammer sole for Sports person',
                    price: 1200000,
                    description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.',
                    category: 'Household',
                    stock: 40
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body.message).to.equal('You do not have access to data product');
                    expect(res).have.status(403);
                    done();
                });
        });

        it('Error required', function (done) {
            chai.request(app)
                .post('products')
                .set('access_token', adminToken)
                .send({})
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body.message).to.have.members(['name is required', 'price is required', 'description is required', 'image is required', 'category is required', 'stock is required']);
                    expect(res).have.status(400);
                    done();
                });
        });

        it('Error format', function (done) {
            chai.request(app)
                .post('products')
                .set('access_token', adminToken)
                .send({
                    name: 'addidas New Hammer sole for Sports person',
                    price: 'as',
                    description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.',
                    category: 'Household',
                    stock: 'asas'
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body.message).to.have.members(['price must number', 'stock must number']);
                    expect(res).have.status(400);
                    done();
                });
        });
    });

    describe('Update product', function () {
        it('Update product without error', function (done) {
            chai.request(app)
                .patch('products/' + productId)
                .set('access_token', adminToken)
                .send({
                    name: 'addidas New Hammer sole for Sports person2',
                    price: 8000000,
                    description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.',
                    category: 'Household 2',
                    stock: 10
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error if not admin', function (done) {
            chai.request(app)
                .patch('products/' + productId)
                .set('access_token', memberToken)
                .send({
                    name: 'addidas New Hammer sole for Sports person2',
                    price: 8000000,
                    description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.',
                    category: 'Household 2',
                    stock: 10
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error invalid id', function (done) {
            chai.request(app)
                .patch('products/' + 'sadsayy6521gvmvashd')
                .set('access_token', adminToken)
                .send({
                    name: 'addidas New Hammer sole for Sports person2',
                    price: 8000000,
                    description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.',
                    category: 'Household 2',
                    stock: 10
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error if product not found', function (done) {
            chai.request(app)
                .patch('products/' + '5d7e80911a4a273a4fbf42b8')
                .set('access_token', adminToken)
                .send({
                    name: 'addidas New Hammer sole for Sports person2',
                    price: 8000000,
                    description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.',
                    category: 'Household 2',
                    stock: 10
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error format', function (done) {
            chai.request(app)
                .patch('products/' + productId)
                .set('access_token', adminToken)
                .send({
                    price: 'sd',
                    stock: 'sad'
                })
                .attach('image', fs.readFileSync('img.jpg'), 'img.jpg')
                .end(function (res, req, next) {
                    expect(res.body.message).to.have.members(['price must number', 'stock must number']);
                    expect(res).have.status(400);
                    done();
                });
        });
    });

    describe('Get a product', function () {
        it('Get a product without error', function (done) {
            chai.request(app)
                .get('products/' + productId)
                .set('access_token', adminToken)
                .end(function (res, req, next) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error invalid id', function (done) {
            chai.request(app)
                .get('products/' + 'sadsad6678y321jbb')
                .set('access_token', adminToken)
                .end(function (res, req, next) {
                    expect(res.body.message[0]).equal.to('Invalid ID');
                    expect(res).have.status(400);
                    done();
                });
        });

        it('Error if data not found', function (done) {
            chai.request(app)
                .get('products/' + '5d7e80911a4a273a4fbf42b8')
                .set('access_token', adminToken)
                .end(function (res, req, next) {
                    expect(res.body.message[0]).equal.to('Data not found');
                    expect(res).have.status(404);
                    done();
                });
        });
    });

    describe('Get all products', function () {
        it('Get all products without error', function (done) {
            chai.request(app)
                .get('products')
                .set('access_token', adminToken)
                .end(function (res, req, next) {
                    expect(res.body.products).must.be.an('array');
                    expect(res.body.products[0]).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
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

    describe('Update product from cart', function () {

    });

    describe('Remove product from cart', function () {

    });

    describe('Checkout', function () {

    });
});