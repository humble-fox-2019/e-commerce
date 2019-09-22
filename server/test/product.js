var chai = require('chai');
var assert = require('assert');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const app = require('../app');
let token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg2YzYzMmVlOTQ5OWU4MDdjZDY2MTIiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTY5MTg3NTEyfQ.1LVlyceN1DLO5jKPRfXV94owUYSUeTYUweIvBcG9i1c';
chai.use(chaiHttp);

describe('Create Product', function() {
	describe('post /products/create', function() {
		it('response should  be object and status 201', function(done) {
			let newProduct = {
				productName: 'Mochi Muji',
				image: 'mochi.jpg',
				category: 'food',
				price: 40000,
				stock: 5,
				description: 'sdfghjklkjhgfdszdfghjlkjd'
			};
			chai.request(app).post('/products/create').set('token', token).send(newProduct).end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(201);
				expect(res).to.be.an('object');
				expect(res.body.data).to.have.property('productName');
				expect(res.body.data).to.have.property('image');
				expect(res.body.data).to.have.property('category');
				expect(res.body.data).to.have.property('price');
				expect(res.body.data).to.have.property('stock');
				expect(res.body.data).to.have.property('description');
				done();
			});
		});
	});
});

describe('Fail Create', function() {
	describe('post /products/create', function() {
		it(`response should be an object and status 400`, function(done) {
			let failInput = {
				productName: 'Lobubulo'
			};
			chai.request(app).post('/products/create').set('token', token).send(failInput).end(function(err, res) {
				expect(res).to.have.status(400);
				expect(res).to.be.an('object');
				done();
			});
		});
	});
});

describe('Fail Create Due to Auth $ isAdmin', function() {
	describe('post /products/create', function() {
		it(`response should be an object and status 403`, function(done) {
			let failInput = {
				productName: 'Lobubulo'
			};
			chai.request(app).post('/products/create').send(failInput).end(function(err, res) {
				expect(res).to.have.status(403);
				expect(res).to.be.an('object');
				done();
			});
		});
	});
});

describe('Destroy Product', function() {
	describe(`delete /products/:id`, function() {
		it(`response should be an object with status 200`, function(done) {
			let deleteThis = '5d803c4012d65223b6fee787'; // please try another id due to this id is already deleted
			chai.request(app).delete(`/products/${deleteThis}`).set('token', token).end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				done();
			});
		});
	});
});

describe('Fail Destroy due to no id', function() {
	describe(`delete /products/:id`, function() {
		it(`response should be an object with status 200`, function(done) {
			let deleteThis = ''; // please try another id due to this id is already deleted
			chai.request(app).delete(`/products/${deleteThis}`).set('token', token).end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(500);
				expect(res).to.be.an('object');
				done();
			});
		});
	});
});
