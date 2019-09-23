const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const { User } = require('../models');

chai.use(chaiHttp);

let tokenUser;

before(function(done){
    chai.request(app)
    .post('/user/register')
    .send({
        email : 'tes12345@m.com',
        password : 'abc123',
        username : 'wkwkusername'
    })
    .end((err, res) => {
        tokenUser = res.body.token
        done()
    })
})

after(function(done) {
    User.deleteMany({})
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
})

describe('Transaction Routes' ,  function(){
    
})