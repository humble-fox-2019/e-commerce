const assert = require('assert');
const mocha = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const app = require('../app');
const expect = chai.expect;

const customerLogin = {
    "email" : "newUser@test.com",
    "password" : "newUser"
}
const adminLogin = {
    email : "admin@admin.com",
    password : "admin"
}

chai.use( chaiHttp );

// User Login Register
describe('User' , function () {
    before('create admin account',function( done ) {
        chai.request(app)
        .post('/register')
        .send({
            "username" : "admin",
            "email" : "admin@admin.com",
            "password" : "admin"
        })
        .end( function( err , res ) {
            done()
        })
    })  
    describe('Register' , function() {
        it('it should return error message as an array' , function (done ) {
            chai.request(app)
            .post('/register')
            .end( function( err, res) {
                expect( res.body ).to.be.an('array')
                expect( res.body ).to.have.lengthOf(3)
                expect( res.body[0] ).to.be.equal('Username is required');
                expect( res.body[1] ).to.be.equal('Email is required');
                expect( res.body[2] ).to.be.equal('Password is required');
                done()
            })
        })
        
        it('it should return error message about username' , function (done ) {
            chai.request(app)
            .post('/register')
            .send({
                "email" : "test123@test.com",
                "password" : "test123"
            })
            .end( function( err, res) {
                expect( res.body ).to.be.an('array')
                expect( res.body ).to.have.lengthOf(1)
                expect( res.body[0] ).to.be.equal('Username is required');
                done()
            })
        })
        it('it should return error message about email' , function (done ) {
            chai.request(app)
            .post('/register')
            .send({
                "username" : "test123",
                "password" : "test123"
            })
            .end( function( err, res) {
                expect( res.body ).to.be.an('array')
                expect( res.body ).to.have.lengthOf(1)
                expect( res.body[0] ).to.be.equal('Email is required');
                done()
            })
        })
        it('it should return error message about password' , function (done ) {
            chai.request(app)
            .post('/register')
            .send({
                "username" : "test123",
                "email" : "test123@test.com"
            })
            .end( function( err, res) {
                expect( res.body ).to.be.an('array')
                expect( res.body ).to.have.lengthOf(1)
                expect( res.body[0] ).to.be.equal('Password is required');
                done()
            })
        })

        // // If Already Created Dont run this
        // it('it should return new user obj' , function( done ) {
        //     chai.request(app)
        //     .post('/register')
        //     .send({
        //         "username" : "newUser",
        //         "email" : "newUser@test.com",
        //         "password" : "newUser"
        //     })
        //     .end( function( err, res ) {
        //         expect( res.body ).to.include.keys('createdUser');
        //         expect( res.body.createdUser ).to.include.keys('username','email','password')
        //         expect( res.body.createdUser.username ).to.be.equals('newUser')
        //         expect( res.body.createdUser.email ).to.be.equals('newUser@test.com')
        //         done();
        //     })
        // })

        it('it should return error message because username already registered' , function( done ) {
            chai.request(app)
            .post('/register')
            .send({
                "username" : "newUser",
                "email" : "newUser@test.com",
                "password" : "newUser"
            })
            .end( function( err, res ) {
                expect( res.body[0] ).to.be.equal("Username already registered")
                done();
            })
        })
        it('it should return error message because email already registered' , function( done ) {
            chai.request(app)
            .post('/register')
            .send({
                "username" : "newUser2",
                "email" : "newUser@test.com",
                "password" : "newUser"
            })
            .end( function( err, res ) {
                expect( res.body[0] ).to.be.equal("Email already registered")
                done();
            })
        })
    })

    describe('Login' , function() {
        it('it should return access token', function( done ) {
            chai.request(app)
            .post('/login')
            .send({
                email : "admin@admin.com",
                password : "admin"
            })
            .end( function( err , res ) {
                expect( res.body ).to.include.all.keys('token' ,'user');
                expect( res.body.user ).to.include.all.keys('email' , 'id' )
                expect( res.body.user.email ).to.equal('admin@admin.com')
                done()
            }) 
        })
        it ('it should return error message' , function( done ) {
            chai.request(app)
            .post('/login')
            .send({
                email : "admin@admins.com",
                password : "admins"
            })
            .end( function( err , res ) {
                expect( res.body ).to.be.equal("Invalid Email / Password")
                done()
            }) 
        })
    })


})


const product = {
    "name" : "Kamado Tanjirou",
    "price" : 300000,
    "stock" : 30,
    "category" : "exclusive",
    "description" : "AYAMas"
}
const updateProduct = {
    "name" : "Update Tanjirou",
    "price" : 304000,
    "stock" : 20,
    "category" : "special",
    "description" : "AYAMas"
}
let productId;
let products = []

// Admin
describe('Product Admin CRUD' , function() {
    let token;
    before('login as Admin' , function( done ) {
        chai.request(app)
        .post('/login')
        .send( adminLogin )
        .end( function( err , res ) {
            token = res.body.token
            done()
        }) 
    })
    // CREATE
    describe('Create A Product' , function( ) {
        it('it should return created product' , function( done ) {
            this.timeout(10000)
            chai.request(app)
            .post('/products')
            .type('form')
            .set( 'token' , token )
            .attach( 'file' , fs.readFileSync('./test/IU.jpg') , 'IU.jpg')
            .field ("name" , "Kamado Tanjirou")
            .field ("price" , 300000 )
            .field ("stock" , 30 )
            .field ("category" , "exclusive")
            .field ("description" , "description")
            // .send( product )
            .end( function( err, res ) {
                expect( res.body ).to.include.all.keys('name', 'price','stock' , 'category', 'description')
                expect( res.body.name ).to.be.equal( product.name ) 
                expect( res.body.price ).to.be.equal( product.price ) 
                expect( res.body.stock ).to.be.equal( product.stock ) 
                expect( res.body.category ).to.be.equal( product.category ) 
                productId = res.body._id
                done();
            })
        })
    })



    // READ
    describe('Get All Product',function(){
        it('it should return all list of product' , function (done) {
            chai.request(app)
            .get('/products')
            .set( 'token' , token )
            .end( function( err, res ) {
                expect( res.body ).to.be.an('array')
                products = res.body
                done();
            })
        })
    })
    // UPDATE 
    describe('Update Product' , function() {
        it('it should return update message' , function( done ) {
            chai.request(app)
            .put(`/products/${productId}`)
            .set( 'token' , token )
            .send( updateProduct )
            .end( function ( err, res ) {
                expect( res.body ).to.include.keys('message')
                expect( res.body.message ).to.be.equal( "Product Updated!")
                done();
            })
        })
    })

    // DELETE
    describe('Delete Product' , function () {
        it('it should return deleted product that updated just before this' , function( done ) {
            chai.request(app)
            .delete(`/products/${productId}`)
            .set( 'token' , token )
            .end( function( err, res) {
                expect( res.body ).to.include.all.keys('message' , 'deletedProduct')
                expect( res.body.message).to.be.equal( 'Product Deleted!' )
                expect( res.body.deletedProduct ).to.be.an('object')
                expect( res.body.deletedProduct ).to.include.all.keys('name' , 'price' , 'stock', 'category' , "description")
                expect( res.body.deletedProduct.name ).to.be.equal( updateProduct.name ) 
                expect( res.body.deletedProduct.price ).to.be.equal( updateProduct.price ) 
                expect( res.body.deletedProduct.stock ).to.be.equal( updateProduct.stock ) 
                expect( res.body.deletedProduct.category ).to.be.equal( updateProduct.category ) 
                expect( res.body.deletedProduct.description ).to.be.equal( updateProduct.description ) 
                
                done()
            })
        })
    })

    after('create a product' , function( done ) {
        this.timeout(10000)
        chai.request(app)
        .post('/products')
        .type('form')
        .set( 'token' , token )
        .attach( 'file' , fs.readFileSync('./test/Jisoo.jpg') , 'Jisoo.jpg')
        .field ("name" , "Kim Jisoo")
        .field ("price" , 300000 )
        .field ("stock" , 30 )
        .field ("category" , "exclusive")
        .field ("description" , "askdjlkadjlka")
        .end( function( err, res ) {
            done()
        })
    })
})

let user;

// Customer [Create , Delete Cart] 
describe('Product Customer' , function() {
    let token;
    let tempProduct
    before('login as Customer' , function( done ) {

        chai.request(app)
        .post('/login')
        .send( customerLogin )
        .end( function( err , res ) {
            token = res.body.token
            user = res.body.user
            done()
        }) 
    })

    describe('Customer cannot Create A Product' , function( ) {
        it('it should return error message because logged user are customer' , function( done ) {
            const product = {
                "name" : "Kamado Tanjirou",
                "price" : 300000,
                "stock" : 30,
                "category" : "exclusive",
                "description" : "SOmething"
            }  
            
            chai.request(app)
            .post('/products')
            .set( 'token' , token )
            .send( product )
            .end( function( err, res ) {
                expect( res.body ).to.be.equal('You must be admin to use this feature!')
                done();
            })
        })
    })

    // See Product
    describe('Get All Product',function(){
        it('it should return all list of product' , function (done) {
            chai.request(app)
            .get('/products')
            .set( 'token' , token )
            .end( function( err, res ) {
                expect( res.body ).to.be.an('array');
                tempProduct = res.body[0];
                done();
            })
        })
    })
    let cartId;
    // Add To Cart
    describe('Add product to Cart ', function( ) {
        it('it should return message and cart of created cart', function ( done ) {
            chai.request(app)
            .post('/products/cart')
            .set( 'token' , token )
            .send({ productId : tempProduct._id , quantity : 2 })
            .end ( function ( err , res ) {
                console.log( res.body , " < << < < << < << < << ")
                expect( res.body ).to.include.all.keys('message' , 'cart')
                expect( res.body.message ).to.be.equal('Added to Cart');
                expect( res.body.cart ).to.be.an('object')
                expect( res.body.cart ).to.include.all.keys('_id' ,'userId' , 'productId', 'quantity' , 'createdAt' , 'updatedAt' );
                expect( res.body.cart.userId ).to.be.equal( user.id )
                expect( res.body.cart.quantity ).to.be.equal( 2 )
                cartId = res.body.cart._id
                done()
            })
        })
    })
    
    // Update qty of item in Cart
    describe ('Update Product Quantity from cart' , function () {
        it ('should return message and previous updated cart ' , function ( done ) {
            chai.request(app)
            .patch(`/products/cart/${cartId}`)
            .set( 'token' , token )
            .send({ quantity : 3 })
            .end( function( err , res ) {
                expect( res.body ).to.include.all.keys('message' ,'updatedCart');
                expect( res.body.message ).to.be.equal('Product Quantity Updated');
                expect( res.body.updatedCart ).to.be.an('object')
                expect( res.body.updatedCart ).to.include.all.keys('_id' ,'userId' , 'productId', 'quantity' , 'createdAt' , 'updatedAt' );
                expect( res.body.updatedCart._id ).to.be.equal( cartId )
                expect( res.body.updatedCart.productId ).to.be.equal( tempProduct._id )
                expect( res.body.updatedCart.userId ).to.be.equal( user.id )
                expect( res.body.updatedCart.quantity ).to.be.equal( 2 )
                done();
            })
        })
    })

    describe('Update Product from Cart more than or less stock' , function() {
        it('should return error message cannot update more than stock' , function ( done ) {
            chai.request(app)
            .patch(`/products/cart/${cartId}`)
            .set( 'token' , token )
            .send({ quantity : 100 })
            .end( function( err , res ) {
                console.log( res.body )
                expect( res.status ).to.be.equal(400)
                expect( res.body ).to.be.equal('Cannot update quantity more than available stock')
                done();
            })
        })
        it('should return error message that cannot update quantity less than 0' , function ( done ) {
            chai.request(app)
            .patch(`/products/cart/${cartId}`)
            .set( 'token' , token )
            .send({ quantity : -2 })
            .end( function( err , res ) {
                expect( res.status ).to.be.equal(400)
                expect( res.body ).to.be.equal('Cannot update quantity less than 0')
                done();
            })
        })
    })
    // Delete Cart
    describe('Delete Product from Cart' , function() {
        it('should return message and deleted product', function( done ) {
            chai.request(app)
            .delete(`/products/cart/${cartId}`)
            .set( 'token' , token )
            .end( function ( err , res ) {
                expect( res.body ).to.include.all.keys('message' ,'deletedProduct');
                expect( res.body.message ).to.be.equal('Product Deleted from cart');
                expect( res.body.deletedProduct ).to.be.an('object')
                expect( res.body.deletedProduct ).to.include.all.keys('_id' ,'userId' , 'productId', 'quantity' , 'createdAt' , 'updatedAt' );
                expect( res.body.deletedProduct._id ).to.be.equal( cartId )
                expect( res.body.deletedProduct.productId ).to.be.equal( tempProduct._id )
                expect( res.body.deletedProduct.userId ).to.be.equal( user.id )
                expect( res.body.deletedProduct.quantity ).to.be.equal( 3 );
                done()
            })
        })
    })

})



// npm run test

// update role newUser jadi admin di database

// npm run test