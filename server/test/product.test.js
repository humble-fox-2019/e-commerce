const chai  = require('chai'),
      chaiHttp = require('chai-http'),
      app = require('../app'),
      Product = require('../models/product'),
      User = require('../models/user'),
      expect = chai.expect;

chai.use(chaiHttp);
let tokenAdmin;
let tokenCustomer;

describe('Product', function() {
    let ProductId;

    before(function(done) {
        User.deleteMany()
               .then(() => {
                   console.log('db user wiped');
                   return Product.deleteMany();
               })
               .then(() => {
                    console.log('db product wiped');
                    done()
               })
               .catch(err => {
                   console.log(err);
               });

        chai.request(app)
            .post('/users/signup')
            .send({
                name: 'admin',
                email: 'admin@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .end(function(err, res) {
                tokenAdmin = res.body.token;
                // console.log(tokenAdmin, 'token admin');
            })
        chai.request(app)
            .post('/users/signup')
            .send({
                name: 'test',
                email: 'test@mail.com',
                password: 'admin',
                role: 'customer'
            })
            .end(function(err, res) {
                tokenCustomer = res.body.token;
                // console.log(tokenCustomer, 'token customer');
            })

    });

    describe('Add Product | POST /products', function() {
        it(`should return 201 status code with success message when succesfull added product`, function(done) {
            let product = {
                name: 'test',
                description: 'test',
                price: 100000,
                stock: 50
            }
            chai.request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send(product)
                .end(function(err,res) {
                    // console.log(res.body)
                    expect(res).to.have.status(201);
                    expect(res.body).to.include.all.keys('name', 'description', 'image', 'price', 'stock');
                    ProductId = res.body._id;
                    done();
                })
                
        });

        it(`should return 400 when there are fields that empty`, function(done) {
            let product = {
                name: '',
                description: '',
                price: '',
                stock: ''
            }
            chai.request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send(product)
                .end(function(err,res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array').that.includes('Name field is required');                    
                    expect(res.body.errors).to.be.an('array').that.includes('Description field is required');                    
                    expect(res.body.errors).to.be.an('array').that.includes('Price field is required');                    
                    expect(res.body.errors).to.be.an('array').that.includes('Stock field is required');                    
                    done();
                });
        });
    
        it(`should return 403 when there is not token header`, function(done) {
            let product = {
                name: 'test',
                description: 'test',
                price: 100000,
                stock: 50
            }
            chai.request(app)
                .post('/products')
                .send(product)
                .end(function(err,res) {
                    expect(res).to.have.status(403);
                    expect(res.body.errors).to.be.an('array').that.includes('You must login first');                  
                    done();
                });
        });

        it(`should return 401 when user customer want to add product`, function(done) {
            let product = {
                name: 'test',
                description: 'test',
                price: 100000,
                stock: 50
            }
            chai.request(app)
                .post('/products')
                .set('token', tokenCustomer)
                .send(product)
                .end(function(err,res) {
                    expect(res).to.have.status(401);
                    expect(res.body.errors).to.be.an('array').that.includes("You haven't authorized");                  
                    done();
                });
        });

        
    })

    describe('Find All | GET /products', function() {
        it(`should return array of products with 200 status code`, function(done) {
            chai.request(app)
                .get('/products')
                // .set('token', tokenCustomer)
                .end(function(err, res) {
                    // console.log(res.body)
                    expect(res).to.has.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object').to.include.all.keys('_id', 'name', 'description', 'stock', 'price', 'image')
                    // console.log(res.body[0]);
                    done();
                })
        });

        // it(`should return 403 status code when there's no token header`, function(done) {
        //     chai.request(app)
        //         .get('/products')
        //         .end(function(err, res) {
        //             // console.log(res.body)
        //             expect(res).to.has.status(403);
        //             expect(res.body.errors).to.be.an('array').that.includes('You must login first');
        //             done();
        //         })
        // })
    });

    describe('Find One | GET /products/:ProductId', function() {
        it(`should return object of product with 200 status code`, function(done) {
            
            chai.request(app)
                .get(`/products/${ProductId}`)
                // .set('token', tokenCustomer)
                .end(function(err, res) {
                    // console.log(res.body);
                    expect(res).to.has.status(200);
                    expect(res.body).to.be.an('object').to.include.all.keys('_id', 'name', 'description', 'stock', 'price', 'image')
                    done();
                })
        });

        // it(`should return 403 status code when there's no token header`, function(done) {
        //     chai.request(app)
        //         .get(`/products/${ProductId}`)
        //         .end(function(err, res) {
        //             // console.log(res.body)
        //             expect(res).to.has.status(403);
        //             expect(res.body.errors).to.be.an('array').that.includes('You must login first');
        //             done();
        //         })
        // })
    });


})
