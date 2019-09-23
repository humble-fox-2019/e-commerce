const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);


const { User } = require('../models');
let tokenUser;
let idProduct = '5d87cd30beb0862cb120d2bc'

before(function(done){
    chai.request(app)
    .post('/user/register')
    .send({
        email : 'tes23@m.com',
        password : 'abc123',
        username : 'hahahaah123'
    })
    .end((err, res) => {
        tokenUser = res.body.token
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

describe('Cart Routes' ,  function(){
    describe('Get User Cart' , function(){
        it('Succes Get User Cart (200)',function(done){
            chai.request(app)
            .get('/cart')
            .set('token',tokenUser)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object').to.have.any.keys('cartList','username')
                done()
            })
        })
        it('user not logged in', function(done){
            chai.request(app)
            .get('/cart')
            .end((err, res) => {
                expect(res).to.have.status(403)
                done()
            })
        })
    })
    describe('Add To Cart ' , function(){
        it('Succes Add To cart (200)',function(done){
            chai.request(app)
            .post('/cart')
            .set('token',tokenUser)
            .send({
                id : idProduct,
                qty : 1
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('stock is up' ,  function(done){
            chai.request(app)
            .post('/cart')
            .set('token',tokenUser)
            .send({
                id : idProduct,
                qty : 100
            })
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
        })
        it('user not logged in',function(done){
            chai.request(app)
            .post('/cart')
            .send({
                id : idProduct,
                qty : 10
            })
            .end((err, res) => {
                expect(res).to.have.status(403)
                done()
            })
        })
    })
    describe('Check Out' ,  function(){
        it('Success Check Out 201' , function(done){
            chai.request(app)
            .post('/cart/checkout')
            .set('token' ,  tokenUser)
            .send({
              alamat : 'alamat rumah !!',
              totalHarga : 500000
            })
            .end((err, res) => {
                expect(res).to.have.status(201)
                done()
            })
        })
    })
})

// describe('cart', function () {
//     it('getCart', function (done) {
//         chai.request(app)
//         .get('/cart')
//         .end((err, res) => {
//             expect(res).to.have.a.status(200);
//             // expect(res).to.have.a.status(201);
//             // expect(res.body).to.have.property('username')
//             // expect(res.body).to.have.property('password')
//             // expect(res.body).to.have.property('email')
//             done()
//         })
//     });
//     it('addCart', function (done) {
//         chai.request(app)
//         .post('/user/login')
//         .send({
//             password : 'abc123',
//             email : 'wanda@mail.com'
//         })
//         .end((err, res) => {
//             expect(res).to.have.a.status(201);
//             // expect(res.body).to.have.property('password')
//             // expect(res.body).to.have.property('email')
//             done()
//         })
//     })
// })
