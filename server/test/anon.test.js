//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const constants = require('../constants/index')
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


describe('User anon', () => {

  it('Should get a valid anon account response', function(done) {
    chai.request(app)
    .post('/api/user/anon')
    .send({})
    .end(function(err, res){
      if (err) done(err)
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.data.should.be.a('object')
      res.body.data.account.should.be.a('object')
      res.body.data.account.id.should.be.a('number')
      res.body.data.account.id.should.be.greaterThan(0)
      res.body.data.account.name.should.be.a('string')
      res.body.data.account.role.should.be.a('string')
      res.body.data.token.should.be.a('string')
      res.body.message.should.equal(constants.messages.SUCCESS_CREATED_ACCOUNT)
      done()
    })
  })
  // .timeout(15000)


  // it('Shouldn\'t publish new post - outdated/wrong token', async () => {
  //   const res = await chai.request('127.0.0.1:8600')
  //   .post('/api/user/anon')
  //   .send({})
  //   console.log(res)
  //   res.should.have.status(200)
  //   // expect(res).to.have.property('errors')
  // })


  // it('"/api/user/anon" Should return a anon user when called', () => {
  //   const { body } = await chai.request(app)
  //   // chai.request(app)
  //   .post('/api/user/anon')
  //   .send()
  //   // .set('Content-Type', 'application/x-www-form-urlencoded')
  //   .end((err, res) => {
  //     console.log(err,res)
  //     // if (err) done(err)
  //     // res.should.have.status(200)
  //     // res.body.should.be.a('object')
  //     // res.body.should.have.property('errors')
  //     // res.body.errors.should.have.property('pages')
  //     // done()
  //   })
  // }).timeout(15000)
})

