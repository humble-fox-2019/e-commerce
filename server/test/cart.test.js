const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
const mongoose = require('mongoose')

chai.use(chaiHttp)