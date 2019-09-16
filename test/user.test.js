const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user');
const expect = chai.expect

chai.use(chaiHttp);

describe('User', function() {
    before(function(done) {
        User.deleteMany()
            .then(() => console.log('success delete'))
        done();
    });

    describe('signup | POST /users/signup', function() {
        // it('should return ..', function(done) {
        //     expect(['a', 'b', 'c']).to.be.an('array').that.includes('b');
        //     done()
        // })
        it('should return token and user payload when signup succesfull', function(done) {
            let user = {
                name: 'test',
                email: 'test@mail.com',
                password: 'test',
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
                    
                    done();
                });
                
        });
        
        it(`should return 'Email already registered' in an array when enters an email that is already registered`, function(done) {
            let user = {
                name: 'test',
                email: 'test@mail.com',
                password: 'test',
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
                name: 'test1',
                email: 'test1mailcom',
                password: 'test1'
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
                name: 'test',
                email: 'test@mail.com',
                password: 'test',
            };
            chai.request(app)
                .post('/users/signin')
                .send({email: user.email, password: user.password})
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.include.all.keys('token', 'payload');
                    expect(res.body.token).to.be.a('string');
                    expect(res.body.payload).to.include.all.keys('name', 'email', 'role');
                    expect(res.body.payload.name).to.equal(user.name);
                    expect(res.body.payload.email).to.equal(user.email);
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
    })
});