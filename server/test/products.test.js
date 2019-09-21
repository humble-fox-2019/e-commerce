const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const mongoose = require('mongoose')
chai.use(chaiHTTP)
const expect = chai.expect

describe('Products', function(){
    let product = null
    beforeEach(function(){
        mongoose.connection.dropCollection('products')
        product = {
            title: "NB 990",
            description: "The comfiest shoes evaaahhh",
            price: 3000000,
            qty: 5,
            brand: 'New Balance',
            image: 'http://lelele'
        }
    })
    describe('/products', function(){
        it('should return the NEW PRODUCT', function(done){
            chai.request(app)
                .post('/products')
                .send(product)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        expect(res.status).to.equal(201)
                        expect(res.body.title).to.equal(product.title)
                        expect(res.body.description).to.equal(product.description)
                        expect(res.body.price).to.equal(product.price)
                        expect(res.body.qty).to.equal(product.qty)
                        expect(res.body.brand).to.equal(product.brand)
                        done()
                    }
                })
        })
        it('should return PRODUCTS', function(done){
            chai.request(app)
                .post('/products')
                .send(product)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        chai.request(app)
                            .get('/products')
                            .send(product)
                            .end(function(err, res){
                                if(err)done(err)
                                else{
                                    expect(res.status).to.equal(200)
                                    expect(res.body[0].title).to.equal(product.title)
                                    expect(res.body[0].description).to.equal(product.description)
                                    expect(res.body[0].price).to.equal(product.price)
                                    expect(res.body[0].qty).to.equal(product.qty)
                                    expect(res.body[0].brand).to.equal(product.brand)
                                    done()
                                }
                })
                    }
                })
        })
        it("it should return no content", function(done){
            chai.request(app)
                .get('/products')
                .send(product)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        expect(res.status).to.equal(204)
                        done()
                    }
            })
        })
        it('should return the No title error', function(done){
            product.title = ""
            chai.request(app)
                .post('/products')
                .send(product)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        expect(res.status).to.equal(400)
                        expect(res.body.message).to.equal("Item must have a title")
                        done()
                    }
                })
        })
        it('should return the No brand error', function(done){
            product.brand = ""
            chai.request(app)
                .post('/products')
                .send(product)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        expect(res.status).to.equal(400)
                        expect(res.body.message).to.equal("Item must have a brand")
                        done()
                    }
                })
        })
        it('should return the No PRICE error', function(done){
            product.price = ""
            chai.request(app)
                .post('/products')
                .send(product)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        expect(res.status).to.equal(400)
                        expect(res.body.message).to.equal("Item must have a price")
                        done()
                    }
                })
        })
        it('should return the No Description error', function(done){
            product.description = ""
            chai.request(app)
                .post('/products')
                .send(product)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        expect(res.status).to.equal(400)
                        expect(res.body.message).to.equal("Item must have a description")
                        done()
                    }
                })
        })
    })
})