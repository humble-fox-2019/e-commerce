const mongoose = require('mongoose');
const fs = require('fs');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require("../models/user");
const Product = require("../models/product");

chai.use(chaiHttp);
let expect = chai.expect;

let customerToken = '';
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
                .end(function (err, res) {
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
                .end(function (err, res) {
                    expect(res.body.message).to.have.members(['Email has been used']);
                    expect(res).to.have.status(400);
                    done();
                })
        });

        it('Error email and password format', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra', password: 'password' })
                .end(function (err, res) {
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
                .end(function (err, res) {
                    customerToken = res.body.access_token;
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
                .end(function (err, res) {
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
                .end(function (err, res) {
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
                .end(function (err, res) {
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
    this.timeout(5000);
    describe('Create product', function () {
        it('Create product without error', function (done) {
            chai.request(app)
                .post('/products')
                .set('access_token', adminToken)
                .field('name', 'addidas New Hammer sole for Sports person')
                .field('price', 1200000)
                .field('description', 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.')
                .field('category', 'Household')
                .field('stock', 40)
                .attach('image', fs.readFileSync('./img.jpg'), 'img.jpg')
                .end(function (err, res) {
                    productId = res.body.data._id;
                    expect(res.body.message).to.equal('successfully created');
                    expect(res.body.data).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res.body.data.name).to.equal('addidas New Hammer sole for Sports person');
                    expect(res.body.data.price).to.equal(1200000);
                    expect(res).have.status(201);
                    done();
                });
        });

        it('Error if not admin', function (done) {
            chai.request(app)
                .post('/products')
                .set('access_token', customerToken)
                .field('name', 'addidas New Hammer sole for Sports person')
                .field('price', 1200000)
                .field('description', 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.')
                .field('category', 'Household')
                .field('stock', 40)
                .attach('image', fs.readFileSync('./img.jpg'), 'img.jpg')
                .end(function (err, res) {
                    expect(res.body.message[0]).to.equal('You dont have authorized to this data');
                    expect(res).have.status(403);
                    done();
                });
        });

        it('Error required', function (done) {
            chai.request(app)
                .post('/products')
                .set('access_token', adminToken)
                .end(function (err, res) {
                    expect(res.body.message).to.have.members(['name is required', 'price is required', 'description is required', 'image is required', 'category is required', 'stock is required']);
                    expect(res).have.status(400);
                    done();
                });
        });
    });

    describe('Update product', function () {
        it('Update product without error', function (done) {
            chai.request(app)
                .patch('/products/' + productId)
                .set('access_token', adminToken)
                .field('name', 'addidas New Hammer sole for Sports person 2')
                .field('price', 1300000)
                .field('description', 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.')
                .field('category', 'Household 2')
                .field('stock', 10)
                .attach('image', fs.readFileSync('./img.jpg'), 'img.jpg')
                .end(function (err, res) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error if not admin', function (done) {
            chai.request(app)
                .patch('/products/' + productId)
                .set('access_token', customerToken)
                .field('name', 'addidas New Hammer sole for Sports person 2')
                .field('price', 1300000)
                .field('description', 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.')
                .field('category', 'Household 2')
                .field('stock', 10)
                .attach('image', fs.readFileSync('./img.jpg'), 'img.jpg')
                .end(function (err, res) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error invalid id', function (done) {
            chai.request(app)
                .patch('/products/' + 'sadsayy6521gvmvashd')
                .set('access_token', adminToken)
                .field('name', 'addidas New Hammer sole for Sports person 2')
                .field('price', 1300000)
                .field('description', 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.')
                .field('category', 'Household 2')
                .field('stock', 10)
                .attach('image', fs.readFileSync('./img.jpg'), 'img.jpg')
                .end(function (err, res) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error if product not found', function (done) {
            chai.request(app)
                .patch('/products/' + '5d7e80911a4a273a4fbf42b8')
                .set('access_token', adminToken)
                .field('name', 'addidas New Hammer sole for Sports person 2')
                .field('price', 1300000)
                .field('description', 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter 2.')
                .field('category', 'Household 2')
                .field('stock', 10)
                .attach('image', fs.readFileSync('./img.jpg'), 'img.jpg')
                .end(function (err, res) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });
    });

    describe('Get a product', function () {
        it('Get a product without error', function (done) {
            chai.request(app)
                .get('/products/' + productId)
                .set('access_token', adminToken)
                .end(function (err, res) {
                    expect(res.body).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error invalid id', function (done) {
            chai.request(app)
                .get('/products/' + 'sadsad6678y321jbb')
                .set('access_token', adminToken)
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Invalid ID');
                    expect(res).have.status(400);
                    done();
                });
        });
    });

    describe('Get all products', function () {
        it('Get all products without error', function (done) {
            chai.request(app)
                .get('/products')
                .set('access_token', adminToken)
                .end(function (err, res) {
                    expect(res.body.products).must.be.an('array');
                    expect(res.body.products[0]).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });
    });

    describe('Delete product', function () {
        it('Error if not admin', function (done) {
            chai.request(app)
                .delete('/products/' + productId)
                .set('access_token', customerToken)
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('You dont have authorized to this data');
                    expect(res).have.status(403);
                    done();
                });
        });

        it('Error invalid id', function (done) {
            chai.request(app)
                .delete('/products/' + 'asdsa21321asdsadAA')
                .set('access_token', adminToken)
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Invalid ID');
                    expect(res).have.status(400);
                    done();
                });
        });

        it('Delete product without error', function (done) {
            chai.request(app)
                .delete('/products/' + productId)
                .set('access_token', adminToken)
                .end(function (err, res) {
                    expect(res.body.message).equal.to('successfully deleted');
                    expect(res.body.data).to.include.keys(['_id', 'name', 'price', 'description', 'image', 'category', 'stock']);
                    expect(res).have.status(200);
                    done();
                });
        });
    });
});

let product1, product2, product3;
describe('Cart', function () {
    before(function (done) {
        let promises = [Product.create({
            name: 'addidas New Hammer sole for Sports person',
            price: 1200000,
            description: 'Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.',
            category: 'Household',
            stock: 40
        }), Product.create({
            name: 'addidas Person advanced',
            price: 1520000,
            description: 'This is description',
            category: 'Stylist',
            stock: 10
        }), Product.create({
            name: 'addidas New luxury',
            price: 990000,
            description: 'lorem ok',
            category: 'Household',
            stock: 15
        })]

        Promise.all(promises)
            .then((result) => {
                product1 = result[0];
                product2 = result[1];
                product3 = result[2];
            })
    });

    describe('Add product to cart', function () {
        it('Add product without error', function (done) {
            chai.request(app)
                .post('/cart')
                .set('access_token', customerToken)
                .send({
                    productId: product1,
                    qty: 3
                })
                .end(function (err, res) {
                    expect(res.body.message).equal.to('Add product successfully');
                    expect(res.body.data).to.include.keys(['productId', 'qty', 'price']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error product not found', function (done) {
            chai.request(app)
                .post('/cart')
                .set('access_token', customerToken)
                .send({
                    productId: '5d75d0f3af42041666563035',
                    qty: 3
                })
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Product not found');
                    expect(res).have.status(404);
                    done();
                });
        });

        it('Error less quantity', function (done) {
            chai.request(app)
                .post('/cart')
                .set('access_token', customerToken)
                .send({
                    productId: product1,
                    qty: 300
                })
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Product quentity not enought');
                    expect(res).have.status(400);
                    done();
                });
        });
    });

    describe('Update product from cart', function () {
        it('Update product without error', function (done) {
            chai.request(app)
                .patch('/cart/' + product2)
                .set('access_token', customerToken)
                .send({
                    qty: 10
                })
                .end(function (err, res) {
                    expect(res.body.message).equal.to('Update product successfully');
                    expect(res.body.data).to.include.keys(['qty', 'price', 'subtotal']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error product not found', function (done) {
            chai.request(app)
                .patch('/cart/' + '5d75d0f3af42041666563035')
                .set('access_token', customerToken)
                .send({
                    qty: 10
                })
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Product not found');
                    expect(res).have.status(404);
                    done();
                });
        });

        it('Error less quantity', function (done) {
            chai.request(app)
                .patch('/cart/' + product2)
                .set('access_token', customerToken)
                .send({
                    qty: 300
                })
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Product quentity not enought');
                    expect(res).have.status(400);
                    done();
                });
        });
    });

    describe('Get my cart', function () {
        it('Get cart without error', function (done) {
            chai.request(app)
                .get('/cart')
                .set('access_token', customerToken)
                .end(function (err, res) {
                    expect(res.body.data).must.be.an('array');
                    expect(res.body.data[0]).to.include.keys(['productId', 'price', 'qty', 'subtotal']);
                    expect(res).have.status(200);
                    done();
                });
        })
    });

    describe('Remove product from cart', function () {
        it('Remove product without error', function (done) {
            chai.request(app)
                .delete('/cart/' + product2)
                .set('access_token', customerToken)
                .send({
                    qty: 10
                })
                .end(function (err, res) {
                    expect(res.body.message).equal.to('Delete product successfully');
                    expect(res.body.data).to.include.keys(['qty', 'price', 'subtotal']);
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error product not found', function (done) {
            chai.request(app)
                .delete('/cart/' + '5d75d0f3af42041666563035')
                .set('access_token', customerToken)
                .send({
                    qty: 10
                })
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Product not found');
                    expect(res).have.status(404);
                    done();
                });
        });
    });

    describe('Checkout', function () {
        it('Checkout without error', function (done) {
            chai.request(app)
                .post('/checkout')
                .set('access_token', customerToken)
                .end(function (err, res) {
                    expect(res.body.message).equal.to('Checkout successfull');
                    expect(res).have.status(200);
                    done();
                });
        });

        it('Error cart empty', function (done) {
            chai.request(app)
                .post('/checkout')
                .set('access_token', customerToken)
                .end(function (err, res) {
                    expect(res.body.message[0]).equal.to('Cart empty');
                    expect(res).have.status(404);
                    done();
                });
        });

        // it('Error less quantity', function (done) {
        //     chai.request(app)
        //         .post('/checkout')
        //         .set('access_token', customerToken)
        //         .end(function (err, res) {
        //             expect(res.body.message).equal.to('Checkout successfull');
        //             expect(res).have.status(200);
        //             done();
        //         });
        // });
    });
});