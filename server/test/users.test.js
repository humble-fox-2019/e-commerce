const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const expect = chai.expect
const mongoose = require('mongoose')
chai.use(chaiHTTP)

describe('Users', function() {
    let user = null
    describe('/users/register', function() {
        beforeEach(function(done){
            user = {email: "admin@admin.com", password: "admin", username: "admin"}
            mongoose.connection.dropCollection('users', function(){
                done()
            })
        })
        
        it('should return INVALID EMAIL ERROR', function(done){
            user.email = "weqweqddq"
            chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res){
                if(err)done(err)
                else{
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.include('Email is invalid')
                    done()
                }
            })
        })
        it('should return EMPTY EMAIL ERROR', function(done){
            user.email = ""
            chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res){
                if(err)done(err)
                else{
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.include('Email must be filled')
                    done()
                }
            })
        })
        it('should return EMPTY PASSWORD ERROR', function(done){
            user.password = ""
            chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res){
                if(err)done(err)
                else{
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.equal('Password must be filled')
                    done()
                }
            })
        })
        it('should return EMPTY USERNAME ERROR', function(done){
            user.username = ""
            chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res){
                if(err)done(err)
                else{
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.equal('Username must be filled')
                    done()
                }
            })
        })
        it('should return the NEW user', function(done) {
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        expect(res.status).to.equal(201)
                        expect(res.body.username).to.equal(user.username)
                        expect(res.body.email).to.equal(user.email)
                        done()
                    }
                })
        })
        it('should return DOUBLE USER ERROR', function(done){
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end(function(err, res){
                    if(err)done(err)
                    else{
                        chai.request(app)
                        .post('/users/register')
                        .send(user)
                        .end(function(err, res){
                            if(err)done(err)
                            else{
                                expect(res.status).to.equal(400)
                                done()
                            }
                        })
                    }
                })
        })
        
    })


    describe('/users/loginform', function(){
        beforeEach(function(){
            user = { email: "admin@admin.com", password: "admin", username: "admin" }
        })
        it('should get the token, email and username', function(done) {
            const login = {
                email: user.email,
                password: user.password
            }
            chai.request(app)
            .post('/users/loginform')
            .send(login)
            .end(function(err, res){
                if(err)done(err)
                else{
                    expect(res.status).to.equal(200)
                    expect(res.body.username).to.equal(user.username)
                    done()
                }
            })
        })
        it('should get Wrong password error', function(done) {
            const login = {
                email: user.email,
                password: 'asssasasa'
            }
            chai.request(app)
            .post('/users/loginform')
            .send(login)
            .end(function(err, res){
                if(err)done(err)
                else{
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.equal('Invalid password')
                    done()
                }
            })
        })
        it('should get User not found error', function(done) {
            const login = {
                email: 'tole',
                password: 'asssasasa'
            }
            chai.request(app)
            .post('/users/loginform')
            .send(login)
            .end(function(err, res){
                if(err)done(err)
                else{
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.equal('User does not exist')
                    done()
                }
            })
        })

    })
})