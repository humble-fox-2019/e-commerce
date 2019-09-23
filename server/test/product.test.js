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

describe('Add Ptoduct', function () {
    describe('POST /product/create', function () {
        it('create product and return 201', function (done) {
            let newItem = {
                name: 'Branded Shoes',
                description: 'This is very expensive shoes you know?',
                price: 3000,
                qty:20,
                image:'https://4.imimg.com/data4/OW/RE/ANDROID-12566067/product-500x500.jpeg'
            }
            chai.request(app)
                .post('/product/create')
                .send(newItem)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an("object")
                   
                    done()
                })
        });
    });

    // it('expect error with 400 code', function (done) {
    //     let newUser = {
    //         email: 'mike@mail.com',
    //         password: 'mike990$%'
    //     }

    //     chai
    //         .request(app)
    //         .post('/users/register')
    //         .send(newUser)
    //         .end(function (err, res) {
    //             // expect(res.body).to.have.keys(['code', 'message'])
    //             // expect(res.body.code).to.equal(400)
    //             // expect(res.body.message).to.equal("<p> Path `username` is required.</p>")
    //             expect(res).to.have.status(400)
    //             done()
    //         })
    // })
});