//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)

function clearTable () {
  return dbConnection.Query('TRUNCATE TABLE users')
}

beforeAll(() => {
  dbConnection.Connect()
  return dbConnection.SelectDB(config.db.database)
  .then(() => clearTable())
})

afterAll(() => {
  dbConnection.Close()
})

const temp_user = { name: 'sdfsfs', email: 'sfsdf@sdfsf.com', password: 'sdffAA11fsdf' };


describe('User', () => {

  it('Should create a user account', (done) => {
    // todo
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      email: temp_user.email,
      password: temp_user.password
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(201)
      expect(res.body).toBeDefined()
      expect(res.body.data).toBeDefined()
      expect(res.body.data.account).toBeDefined()
      expect(res.body.data.account.id).toBeGreaterThan(0)
      expect(res.body.data.account.name).toBeDefined()
      expect(res.body.data.account.role).toBeDefined()
      expect(typeof res.body.data.account.name === 'string').toBe(true)
      expect(typeof res.body.data.account.role === 'string').toBe(true)
      expect(res.body.data.token).toBeDefined()
      expect(typeof res.body.data.token === 'string').toBe(true)
      expect(res.body.data.token.length).toBeGreaterThan(10)
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_CREATED_ACCOUNT)
      done()
    })
  })

  it('An already used email should fail to create a user account', (done) => {
    // todo
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      email: temp_user.email,
      password: temp_user.password
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(401)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.errors.EMAIL_IN_USE)
      done()
    })
  })

})

