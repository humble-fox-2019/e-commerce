const chai = require('chai')
const chaihttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaihttp)

describe('API Testing', () => {
    it('should success to retrive data create', (done) => {
        chai.request(app) // chai meminta base URL dan port kita
            .post('/products')
            .send({
                name: "Nike Zoom",
                size: 44,
                color: "blue",
                stock: 10
            })
            .end((err, res) => {
                // kita melakukan response assertion disini
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('size')
                expect(res.body).to.have.property('color')
                expect(res.body).to.have.property('stock')
                expect(res.body.name).to.equal('Nike Zoom')
                expect(res.body.color).to.equal('blue')
                expect(res.body.size).to.equal(44)
                expect(res.body.stock).to.equal(10);
                done()
            });
    });

    it('should success to retrive all data', (done) => {
        chai.request(app)
            .get('/products')
            .end((req, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
    })
});