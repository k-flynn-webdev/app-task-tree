//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const chai = require('chai')
const should = chai.should()
chai.use(chaiHttp)

const waitTime = 3 * 1000
dbConnection.Init(app)


// force a wait time for app to run
setTimeout(function() {
  run()
}, waitTime)


describe('Node project starts', () => {

  it('Should get a response of 200', function(done) {
    chai.request(app)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200)
      res.headers.toString().length.should.be.above(3)
      done()
    })
  })

})

