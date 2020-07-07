//Require the dev-dependencies
const userServiceQueries = require('../services/user.service').ALL_QUERIES
const userService = require('../services/user.service')
const dbConnection = require('../interfaces/db_init_sql')
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)

function createAccount (account) {
  return userService.Create(account)
}

beforeAll(() => {
  dbConnection.Connect()
  return dbConnection.SelectDB(config.db.database)
})

afterAll(() => {
  dbConnection.Close()
})

describe('User anon', () => {

  it('Should create a valid user anon account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER_ANON)
    .send({})
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
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_CREATED_ACCOUNT)
      done()
    })
  })

  it('Should not upgrade a invalid account', (done) => {
    let newUser = null

    return createAccount({
      name: constants.vars.ANON,
      email: constants.vars.ANON,
      password: constants.vars.ANON })
    .then(({ insertId }) => {
      newUser = { id: insertId }
      const fakeUser = 4000
      return chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_UPGRADE(fakeUser))
      .send({
        id: fakeUser,
        name: 'newName',
        email: 'email@email.com',
        password: 'newPassword1234'})
    })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(404)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.errors.ACCOUNT_MISSING)
      done()
    })
  })

  it('Should not upgrade a mismatched id account', (done) => {
    let newUser = null

    return createAccount({
      name: constants.vars.ANON,
      email: constants.vars.ANON,
      password: constants.vars.ANON })
    .then(({ insertId }) => {
      newUser = { id: insertId }
      const fakeUser = 201
      return chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_UPGRADE(fakeUser))
      .send({
        id: 202,
        name: 'newName',
        email: 'email@email.com',
        password: 'newPassword1234'})
    })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('ID mismatch for user upgrade.')
      done()
    })
  })

  it('Should upgrade a valid anon account', (done) => {
    let newUser = null

    return createAccount({
      name: constants.vars.ANON,
      email: constants.vars.ANON,
      password: constants.vars.ANON })
    .then(({ insertId }) => {
      newUser = { id: insertId }
      return chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_UPGRADE(newUser.id))
      .send({
        id: newUser.id,
        name: 'newName',
        email: 'email@email.com',
        password: 'newPassword1234'})
    })
    .then(res => {
      console.log(res.body)
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('ID mismatch for user upgrade.')
      done()
    })
  })

  // it('Should not upgrade a pre-existing normal account', (done) => {



  })

