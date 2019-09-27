var chai = require('chai');
var assert = require('assert');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const app = require('../app');
let token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg3ZjBjNmI3NjNiNDZmNTcxMjhkYmQiLCJuYW1lIjoicGVsdXBhIiwiZW1haWwiOiJsdXBhZ2VuZ0BtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2OTE5MDA5Nn0.ljxt9mjNMpEPJ1oRDGjvjffVTjev1Mq_MTKkw4tD3jA';
chai.use(chaiHttp);

describe('Create Product', function() {
	describe('post /products/create', function() {
		it('response should  be object and status 201', function(done) {
			let input = {
				listItem: {
					'354bfurfn63kldiev': {
						_id: '354bfurfn63kldiev',
						productName: 'Mochi Muji',
						description: 'and manyMore',
						quantity: 4
					}
				},
				totalPayment: 20000
			};
			chai.request(app).post('/carts/create').set('token', token).send(input).end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.have.property('message');
				done();
			});
		});
	});
});

describe('Fail Create Product', function() {
	describe('post /products/create', function() {
		it('response should  be object and status ', function(done) {
			let inputFail = {};
			chai.request(app).post('/carts/create').set('token', token).send(inputFail).end(function(err, res) {
				expect(res).to.have.status(500);
				expect(res).to.be.an('object');
				done();
			});
		});
	});
});
