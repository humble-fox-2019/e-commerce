// // var assert = require('assert');
// const chai = require('chai')
// // const chaiHttp = require('chai-http')
// const expect = chai.expect()

// // CREATE


// // describe('Array', function () {
// //     describe('#indexOf()', function () {
// //         it('should return -1 when the value is not present', function () {
// //             assert.equal([1, 2, 3].indexOf(4), -1);
// //         });
// //     });
// // });


// // POST PRODUCT
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