const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHTTP)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y4OGY3YTFhYzQ2MTFmNDc3Yjk2NCIsImlhdCI6MTU2ODYzOTIyM30.uiDZ1KmIBth1MNc54nNr0Q2Jnd3Z2Wn5vaswfMgbkaE"

const owner = "5d7f88f7a1ac4611f477b964"

const itemId = "5d87030c5bd71318ab5fb954"

describe('POST /products/new', function () {
    describe('Success Post New Product', function () {
        it('#create(req, res, next)', function (done) {
            const product = {
                name: "Bantal",
                description: "Bantal putih bulu angsa",
                stock: 100,
                images: ["https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/37492119/37492119_73146cf6-5220-4a78-a8c6-b1a712322b07_305_305.jpg", "https://harga-jual.com/wp-content/uploads/2017/10/1456076_cd452031-13a2-425c-9fa8-57ec052df41f.jpg", "https://moedah.com/wp-content/uploads/2017/04/bantal-dan-guling-dacron-1024x1024.jpg"],
                price: 200000
            }
            chai.request(app)
                .post('/products/new')
                .set('token', token)
                .send(product)
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body.name).to.be.equal(product.name)
                        expect(res.body.description).to.be.equal(product.description)
                        expect(res.body.images).to.be.deep.equal(product.images)
                        expect(res.body.stock).to.be.at.least(0)
                        expect(res.body.price).to.be.at.least(0)
                        expect(res.body.owner).to.exist;
                        expect(res.body.createdAt).to.exist;
                        expect(res.body.updatedAt).to.exist;
                        done()
                    }
                })
        })
    })
    describe('Fail Post New Product', function () {
        it('#create(req, res, next)', function (done) {
            const wrongProduct = {
                name: "",
                description: "Bantal putih bulu angsa",
                stock: 0,
                images: ["https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/37492119/37492119_73146cf6-5220-4a78-a8c6-b1a712322b07_305_305.jpg", "https://harga-jual.com/wp-content/uploads/2017/10/1456076_cd452031-13a2-425c-9fa8-57ec052df41f.jpg", "https://moedah.com/wp-content/uploads/2017/04/bantal-dan-guling-dacron-1024x1024.jpg"],
                price: 0
            }
            chai.request(app)
                .post('/products/new')
                .set('token', token)
                .send(wrongProduct)
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Array')
                        expect(res.body.every(el => typeof el === 'string'), "An Array of Strings is expected as error response").to.be.true
                        done()
                    }
                })
        })
    })
})

describe('GET /products/', function () {
    describe('Get All Products', function () {
        it('#read(req, res, next)', function (done) {
            chai.request(app)
                .get('/products')
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        // expect(res.body.every(el => typeof el === 'object')).to.be.true
                        done()
                    }
                })
        })
    })
})

const newUpdate = {
    name: "Bantal - Edit",
    description: "Bantal putih bulu angsa",
    stock: 100,
    images: ["https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/37492119/37492119_73146cf6-5220-4a78-a8c6-b1a712322b07_305_305.jpg", "https://harga-jual.com/wp-content/uploads/2017/10/1456076_cd452031-13a2-425c-9fa8-57ec052df41f.jpg", "https://moedah.com/wp-content/uploads/2017/04/bantal-dan-guling-dacron-1024x1024.jpg"],
    price: 200000
}

describe.only('PUT /products/:id', function () {
    describe('Edit product but user is not Admin', function () {
        it('#update(req, res, next)', function (done) {
            let token = ""
            chai.request(app)
                .put(`/products/${itemId}`)
                .set('token', token)
                .set('status', 'customer')
                .send(newUpdate)
                .end((err, res) => {
                    if (err) done(err)
                    else {
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.a('string')
                        expect(res.body).to.match()
                        done()
                    }
                })
        })
    })

})