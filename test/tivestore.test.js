var mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
let should = chai.should();

describe('Authentication', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            console.log('db dropped');
            // process.exit(0);
            done()
        });
    });

    describe('registration', function () {
        it('should registration without error', function (done) {
            chai.request(app)
                .post('/registration')
                .send({ name: 'candra saputra', email: 'candrasaputra@live.com', password: 'password123' })
                .end(function (req, res, next) {
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('role');
                    res.body.name.should.equal('candra saputra');
                    res.body.role.should.equal('customer');
                    res.should.have.status(201);
                    done();
                })
        });
    })
})