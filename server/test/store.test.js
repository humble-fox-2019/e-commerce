const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const Shop = require('../models/Shop')

const expect = chai.expect
chai.use(chaiHTTP)

