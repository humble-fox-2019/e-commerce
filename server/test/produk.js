const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app')
const { User } = require('../models');
const fs = require('fs')
chai.use(chaiHttp);

let tokenUser;
let tokenAdmin;
let tokenAdminfix = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVkODdkMDM0YTc1MDBlMzA5OWYzYzE2OSIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCRXUzdOZ2VlcWN1VnZNVEp3SjVDZVllNlJXR2prTEI3djVuQ0pqaUs2dE4yVmNQMU4ySk10RyIsImVtYWlsIjoibWFzdGVyQG1haWwuY29tIiwiY2FydExpc3QiOltdLCJfX3YiOjB9LCJpYXQiOjE1NjkxODE3NDh9.X47vRc3HHt1MFGSbgFr2LCmu3o3pWKw-RIgLXaV50Zc'
before(function(done){
    chai.request(app)
    .post('/user/register')
    .send({
        email : 'tes@m.com',
        password : 'abc123',
        username : 'hahahaah'
    })
    .end((err, res) => {
        tokenUser = res.body.token
        done()
    })
})

before(function(done){
    chai.request(app)
    .post('/user/register')
    .send({
        email : 'master@mail.com',
        password : 'abc123',
        username : 'admin'
    })
    .end((err, res) => {
        console.log(res.body.token , ' PALING PENTING !!!!')
        tokenAdmin = res.body.token
        done()
    })
})

after(function(done) {
    User.deleteMany({})
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
})


describe('Product Routes' ,  function() {
    describe('GET ALL Product' , function(done){
        it('Succes Get All' , function(done){
            chai.request(app)
            .get('/product')
            .set('token',tokenUser)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
        })
        it('Not Authorized 403' ,  function(done){
            chai.request(app)
            .get('/product')
            .end((err, res) => {
                expect(res).to.have.status(403)
                done()
            })
        })
    })
    describe('CREATE NEW PRODUCT' ,  function(done){
        it('Succes Create Product (201)' , function(done){
            chai.request(app)
            .post('/product')
            .set('token',tokenAdminfix)
            .attach('image' ,fs.readFileSync('./img.jpeg'),'image')
            .field('name' , 'Bola Basket')
            .field('price' ,  5000)
            .field('stock' ,  20)
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object').to.have.any.keys('name','price','stock','image')
                done()
            })
        })
        it('validation Error, Must Be Admin!! (403)' ,  function(done){
            chai.request(app)
            .post('/product')
            .set('token',tokenUser)
            .attach('image' ,fs.readFileSync('./img.jpeg'),'image')
            .field('name' , 'Bola Basket')
            .field('price' ,  50004)
            .field('stock' ,  20)
            .end((err, res) => {
                expect(res).to.have.status(403)
                done()
            })
        })
        it('Error Create ,  without(image) (400) ',function(done){
            chai.request(app)
            .post('/product')
            .set('token',tokenAdmin)
            .field('name' , 'Bola Basket')
            .field('price' ,  50004)
            .field('stock' ,  20)
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Image Required')
                done()
            })
        })
        it('Error Create ,  without(price) (400) ',function(done){
            chai.request(app)
            .post('/product')
            .set('token',tokenAdmin)
            .attach('image' ,fs.readFileSync('./img.jpeg'),'image')
            .field('name' , 'Bola Basket')
            .field('stock' ,  20)
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Price Required')
                done()
            })
        })
        it('Error Create ,  without(stock) (400) ',function(done){
            chai.request(app)
            .post('/product')
            .set('token',tokenAdmin)
            .attach('image' ,fs.readFileSync('./img.jpeg'),'image')
            .field('name' , 'Bola Basket')
            .field('price' ,  50004)
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Stock Required')
                done()
            })
        })
    })
})