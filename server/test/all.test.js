const chai  = require('chai'),
      chaiHttp = require('chai-http'),
      app = require('../app'),
      Product = require('../models/product'),
      User = require('../models/user'),
      expect = chai.expect;

chai.use(chaiHttp);
let tokenAdmin;
let tokenCustomer;
let ProductId;

describe('Product', function() {
    before(function(done) {
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
                console.log(tokenAdmin, 'token admin');
                chai.request(app)
                    .post('/users/signup')
                    .send({
                        name: 'test',
                        email: 'test@mail.com',
                        password: 'test',
                        role: 'customer'
                    })
                    .end(function(err, res) {
                        tokenCustomer = res.body.token;
                        console.log(tokenCustomer, 'token customer');
                        done();
                    });
            });
    });

    after(function(done) {
        User.deleteMany()
            .then(() => {
                console.log('success delete user');
                // return Product.deleteMany();
                done();
            })
            // .then(() => {
            //     console.log('success delete user');
            //     done();
            // });
    })

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

        it(`should return 401 when user customer (not admin) want to add product`, function(done) {
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
    });


})

describe('User', function() {
    let CartId;

    // before(function(done) {        
    //     // chai.request(app)
    //     // .post('/users/signup')
    //     // .send({
    //     //     name: 'admin',
    //     //     email: 'admin@mail.com',
    //     //     password: 'admin',
    //     //     role: 'admin'
    //     // })
    //     // .end(function(err, res) {
    //     //     tokenAdmin = res.body.token;
    //     //     console.log(tokenAdmin, 'token admin');
    //     // })
    //     // done();
    // });

    after(function(done) {
        User.deleteMany()
            .then(() => {
                console.log('success delete user');
                return Product.deleteMany();
            })
            .then(() => {
                console.log('success delete product');
                done();
            });
    })

    describe('Signup | POST /users/signup', function() {
        it('should return token and user payload when signup succesfull', function(done) {
            let user = {
                name: 'customer',
                email: 'customer@mail.com',
                password: 'customer',
                image: 'http://test.com/a.png'
            };
            chai.request(app)
                .post('/users/signup')
                .type('form')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body.token).to.be.a('string');
                    expect(res.body.payload).to.include.all.keys('name', 'email', 'role');
                    expect(res.body.payload.name).to.equal(user.name);
                    expect(res.body.payload.email).to.equal(user.email);
                    expect(res.body.payload.role).to.equal('customer');
                    // console.log(res.body)
                    tokenCustomer = res.body.token;
                    // console.log(tokenCustomer);
                    done();
                });
                
        });
        
        it(`should return 'Email already registered' in an array when enters an email that is already registered`, function(done) {
            let user = {
                name: 'customer',
                email: 'customer@mail.com',
                password: 'customer',
                image: 'http://test.com/a.png'
            };
            chai.request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array').that.includes('Email already registered');
                    done();
                });
        });
        
        it(`should return array of error messages when name, email, and/or password is empty`, function(done) {
            let user = {
                name: '',
                email: '',
                password: ''
            };
            chai.request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array').that.includes('Name field is required');
                    expect(res.body.errors).to.be.an('array').that.includes('Email field is required');
                    expect(res.body.errors).to.be.an('array').that.includes('Password field is required');
                    done();
                });
        });
        
        it(`should return 'Email format is invalid' in an array when email format invalid`, function(done) {
            let user = {
                name: 'customer',
                email: 'customermailcom',
                password: 'customer',
                image: 'http://test.com/a.png'
            };
            chai.request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array').that.includes('Email format is invalid');
                    done();
                });
        });
    });
    
    describe('Signin | POST /users/signin', function() {
        it('should return token and user payload when login successfull', function(done) {
            let user = {
                email: 'customer@mail.com',
                password: 'customer'
            };
            chai.request(app)
                .post('/users/signin')
                .send({email: user.email, password: user.password})
                .end(function(err, res) {
                    // console.log(JSON.stringify(res.body.payload, null, 2))
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.include.all.keys('token', 'payload');
                    expect(res.body.token).to.be.a('string');
                    // token = res.body.token;
                    expect(res.body.payload).to.include.all.keys('name', 'email', 'role');
                    expect(res.body.payload.role).to.equal('customer');
                    done();
                });
        });
        
        
        it(`should return 'Incorrect email or password' in an array when user enters wrong email or password`, function(done) {
            let user = {
                email: 'wrong@mail.com',
                password: 'wrong'
            };
            chai.request(app)
                .post('/users/signin')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array').that.includes('Incorrect email or password');
                    done();
                });
        });       
    });

    describe('Add to Cart | POST /users/cart', function() {
        it(`should return status code 201 when succesfully added cart`, function(done) {
            chai.request(app)
                .post('/users/cart')
                .set('token', tokenCustomer)
                .send({
                    ProductId: ProductId,
                    count: 5
                })
                .end(function(err, res) {
                    // console.log(res.body)
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('string').to.equal('Added to cart');
                    done();
                })
        });

        it(`should return status code 400 when product id is not valid`, function(done) {
            chai.request(app)
                .post('/users/cart')
                .set('token', tokenCustomer)
                .send({
                    ProductId: '',
                    count: 5
                })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array').that.includes('Product ID is not valid');
                    done();
                })
        });

        it(`should return status code 403 when there isn't token header`, function(done) {
            chai.request(app)
                .post('/users/cart')
                .send({
                    ProductId: ProductId,
                    count: 5
                })
                .end(function(err, res) {
                    expect(res).to.have.status(403);
                    expect(res.body.errors).to.be.an('array').that.includes('You must login first');
                    done();
                })
        });
    });

    describe('Get Cart | GET /users/cart', function() {
        it(`should return status code 200 when succesfully get cart`, function(done) {
            chai.request(app)
                .get('/users/cart')
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    CartId = res.body[0]._id;
                    console.log('>>>>> CartID', CartId)
                    done();
                })
        });

        it(`should return status code 403 when there isn't token header`, function(done) {
            chai.request(app)
                .get('/users/cart')
                .end(function(err, res) {
                    expect(res).to.have.status(403);
                    expect(res.body.errors).to.be.an('array').that.includes('You must login first');
                    done();
                })
        });
    });

    describe('Checkout Cart | POST /users/checkout', function() {
        it(`should return status code 200 when succesfully checkout`, function(done) {
            chai.request(app)
                .post('/users/checkout')
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('string').to.equal('Checkout success!');
                    done();
                })
        });

        it(`should return status code 403 when there isn't token header`, function(done) {
            chai.request(app)
                .post('/users/checkout')
                .end(function(err, res) {
                    expect(res).to.have.status(403);
                    expect(res.body.errors).to.be.an('array').that.includes('You must login first');
                    done();
                })
        });
    });

    describe('Delete Cart | DELETE /users/cart/:CartId', function() {
        before(function(done) {
            chai.request(app)
                .post('/users/cart')
                .set('token', tokenCustomer)
                .send({
                    ProductId: ProductId,
                    count: 5
                })
                .end(function(err, res) {
                    chai.request(app)
                        .get('/users/cart')
                        .set('token', tokenCustomer)
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.an('array');
                            CartId = res.body[0]._id;
                            console.log('>>>>> CartID', CartId)
                            done();
                        })
                })
        })

        it(`should return status code 200 when succesfully checkout`, function(done) {
            chai.request(app)
                .delete(`/users/cart/${CartId}`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('string').to.equal('Cart deleted');
                    done();
                })
        });

        it(`should return status code 401 when user checkout another cart id`, function(done) {
            let CartId = '5d87cb89e76d410575f5ec29';

            chai.request(app)
                .delete(`/users/cart/${CartId}`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    // console.log(res.body)
                    expect(res.body.errors).to.be.an('array').that.includes("You haven't authorize with this cart!");
                    done();
                })
        });

        it(`should return status code 403 when there isn't token header`, function(done) {            
            chai.request(app)
                .delete(`/users/cart/${CartId}`)
                .end(function(err, res) {
                    expect(res).to.have.status(403);
                    expect(res.body.errors).to.be.an('array').that.includes('You must login first');
                    done();
                })
        });
    });

});