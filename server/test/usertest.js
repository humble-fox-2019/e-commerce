const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp);

after(function(done){
    User.deleteMany()
    .then(response=>{
        console.log(response)
        console.log("Success cleared database")
        done()
    })
})

describe('POST/user/register', function(){
    it ('Account is successfully created', function(done){
        let user = {
            name : "asoy",
            email :"asoy@gmail.com",
            password : "hai"
        }
        chai.request(app)
        .post('/user/register')
        .send(user)
        .end (function(err,res){
            // console.log("<<<<<<<<<<<<<<<<")
            // console.log(res.body)
            expect(res).to.have.status(201)
            expect(res.body.data.name).to.equal(user.name)
            expect(res.body.data.email).to.equal(user.email)
            expect(res.body.data.password).not.equal(user.password)
            done()
        })
    })

    it ('This is not email format', function(done){
        let user = {
            name : "halo",
            email :"halogmailcom",
            password: "halo"
        }
        chai.request(app)
        .post('/user/register')
        .send(user)
        .end (function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400)
            done()
        })
    })

    it ('Field required', function(done){
        let user = {
            name : "a",
            email :"a",
            password: "a"
        }
        chai.request(app)
        .post('/user/register')
        .send(user)
        .end (function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400)
            done()
        })
    })

})