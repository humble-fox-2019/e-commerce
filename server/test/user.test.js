const user = require('../models/user')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { clearDatabase } = require('../helpers/clearDatabase')


chai.use(chaiHttp)

after(function (done) {
    clearDatabase(done)
})
describe('User Registration', function () {
    describe('POST /user/register', function () {
        it('should register with retun user and 201 code', function (done) {
            let newUser = {
                name: 'alex',
                email: 'alex@mail.co',
                password: 'theXnm3246??'
            }
            chai.request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an("object")
                    //console.log(res.body,'ssssssssssssss');
                    expect(res.body.data.name).to.equal(newUser.name)
                    expect(res.body.data.email).to.equal(newUser.email)
                    expect(res.body.data.password).to.equal(newUser.password)
                    done()
                })
        });
    });

    it('expect error with 400 code', function (done) {
        let newUser = {
            email: 'mike@mail.com',
            password: 'mike990$%'
        }

        chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function (err, res) {
                // expect(res.body).to.have.keys(['code', 'message'])
                // expect(res.body.code).to.equal(400)
                // expect(res.body.message).to.equal("<p> Path `username` is required.</p>")
                expect(res).to.have.status(400)
                done()
            })
    })
});

