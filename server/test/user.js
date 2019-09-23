const chai = require('chai')
const app = require('../app')
const expect = chai.expect
const chaiHttp = require('chai-http')
// CREATE


// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present', function () {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });


chai.use(chaiHttp)

describe('Register', function () {
    describe('POST /user/login', function () {
        it('should success register with status code 201', function (done) {
            let newUser = {
                name: 'Fadhi Surya',
                email: 'pudhilcorp@gmail.com',
                password: 'AlBaghdadi',

            }

            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    console.log(res.body, '<<< INI ISI DARI BODY DI TESTING USER UNTUK REGISTER')
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body.data.name).to.equal(newUser.name)
                    expect(res.body.data.email).to.equal(newUser.email)
                    done()
                })
        })
    })
})
// POST PRODUCT
// describe('Product', function () {
//     describe('POST /', function () {
//         it('should return error if one field is blank except for picture', function () {
//             const obj = {
//                     productName: 'Samsung A20 3/32',
//                     description: 'Garansi Sein Baru, Resmi 2 Tahun Indonesia dan Asia Tenggara',
//                     stock: 10,
//                     price: 1900000
//                 }

//                 .chai.request('http://localhost:3000')
//                 .post('/')
//                 .send(obj)
//                 .end(function (err, res) {
//                     expect(res).to.have.status(400);
//                     expect(res.body.code).to.equal(400);
//                     // expect(res.body)
//                 })
//         })
//     })
// })

describe('User Testing', function () {

})