const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHTTP)

describe('GET /', function () {
    it('Server Test', function (done) {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                if (err) done(err)
                else {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message')
                    done()
                }
            })
    })
})