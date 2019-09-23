const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const { User } = require('../models');

chai.use(chaiHttp);


let newUser = {
    username : 'joe',
    password : 'abc123',
    email : 'joe@mail.com'
}


after(function(done) {
    User.deleteMany({})
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
})

describe('User Routes', function () {
    describe('REGISTER' , function(){
        it('Succes Register', function (done) {
            chai.request(app)
            .post('/user/register')
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object').to.have.any.keys('message', 'token','user')
                expect(res.body.user.password).not.equal(newUser.password)
                done()
            })
        });
        it('Error Email Unique 400' ,  function(done){
            chai.request(app)
            .post('/user/register')
            .send(newUser)
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Email Must Be Unique')    
                done()
            })
        });
        it('Error Email Invalid 400' ,  function(done){
            chai.request(app)
            .post('/user/register')
            .send({
                email : 'wkwk',
                username : 'satuduatiga',
                password : '12345678'
            })
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('email invalid')    
                done()
            })
        })
        it('Error Username Unique 400' ,  function(done){
            chai.request(app)
            .post('/user/register')
            .send({
                email : 'satudua@mail.com',
                ...newUser
            })
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Username Must Be Unique')    
                done()
            })
        });
        it('Error Register (without username) 400' ,function(done){
            chai.request(app)
            .post('/user/register')
            .send({
                password : 'abc123',
                email : 'm@mail.com'
            })
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Username Required')
                done()
            })
        })
        it('Error Register (without email) 400' ,function(done){
            chai.request(app)
            .post('/user/register')
            .send({
                username : 'lol',
                password : 'abc123',
            })
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Email Required')
                done()
            })
        })
        it('Error Register (without password) 400' ,function(done){
            chai.request(app)
            .post('/user/register')
            .send({
                username : 'lol',
                email : 'satu@mail.com'
            })
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Password Required')
                done()
            })
        })
        it('Error Register (without username , password , and email)' ,  function(done){
            chai.request(app)
            .post('/user/register')
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Email Required')
                expect(res.body.message).that.includes('Password Required')
                expect(res.body.message).that.includes('Username Required')
                done()
            })
        })
        it('Error Register (password min length 5) 400',function(done){
            chai.request(app)
            .post('/user/register')
            .send({
                email : 'haha@mail.com',
                password : '1234',
                username : 'mantap'
            })
            .end((err,res)=>{
                expect(res).to.have.status(400)
                expect(res.body.message).that.includes('Password minimal 5 huruf')
                done()
            })
        })
    })
    describe('LOGIN' , function(){
        it('Succes Login', function (done) {
            chai.request(app)
            .post('/user/login')
            .send({
                password : newUser.password,
                email : newUser.email
            })
            .end((err, res) => {
                expect(res).to.have.a.status(200);
                expect(res.body).to.be.an('object').to.have.any.keys('message', 'token','user')
                expect(res.body.user.password).not.equal(newUser.password)
                done()
            })
        })
        it('Wrong email' ,  function (done){
            chai.request(app)
            .post('/user/login')
            .send({
                password : newUser.password,
                email : 'email salaha'
            })
            .end((err, res) => {
                expect(res).to.have.a.status(400);
                expect(res.body.message).equal('Email or Password Not Found')
                done()
            })
        })
        it('Wrong Password' ,  function (done){
            chai.request(app)
            .post('/user/login')
            .send({
                password : 'password salah',
                email : newUser.email
            })
            .end((err, res) => {
                expect(res).to.have.a.status(400);
                expect(res.body.message).equal('Email or Password Not Found')
                done()
            })
        })
    })
})
