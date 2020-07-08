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
      expect(res.body.data.account.role).toBe(constants.roles.ANON)
      expect(res.body.data.token).toBeDefined()
      expect(typeof res.body.data.token === 'string').toBe(true)
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_CREATED_ANON_ACCOUNT)
      done()
    })
  })

  it('Should not upgrade a invalid account', (done) => {
    let newUser = null

    return createAccount({
      name: constants.roles.ANON,
      email: constants.roles.ANON,
      password: constants.roles.ANON })
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
      name: constants.roles.ANON,
      email: constants.roles.ANON,
      password: constants.roles.ANON })
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

  it('Should not upgrade a pre-existing normal account', (done) => {
    const userDetails = {
      id: null,
      name: 'newName111',
      email: 'email@em123ail.com',
      password: 'newPass123word1234'
    }

    return createAccount({
      name: constants.roles.ANON,
      email: constants.roles.ANON,
      password: constants.roles.ANON,
      role: constants.roles.USER })
    .then(({ insertId }) => {
      userDetails.id = insertId
      return chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_UPGRADE(userDetails.id))
      .send(userDetails)
    })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.errors.ACCOUNT_ALREADY_UPGRADED)
      done()
    })
  })

  it('Should upgrade a valid anon account', (done) => {
    const userDetails = {
      id: null,
      name: 'newName',
      email: 'ema1il@em111ail.com',
      password: 'ne11wPassword1234'
    }

    return createAccount({
      name: constants.roles.ANON,
      email: constants.roles.ANON,
      password: constants.roles.ANON,
      role: constants.roles.ANON })
    .then(({ insertId }) => {
      userDetails.id = insertId
      return chai.request(config.ip + ':' + config.port)
        .patch(constants.paths.API_USER_UPGRADE(userDetails.id))
        .send(userDetails)
    })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(201)
      expect(res.body).toBeDefined()
      expect(res.body.data).toBeDefined()
      expect(res.body.data.account).toBeDefined()
      expect(res.body.data.account.id).toBe(userDetails.id)
      expect(res.body.data.account.name).toBe(userDetails.name)
      expect(res.body.data.account.email).toBe(userDetails.email)
      expect(res.body.data.account.role).toBeDefined()
      expect(res.body.data.account.role).toBe(constants.roles.USER)
      expect(res.body.data.token).toBeDefined()
      expect(typeof res.body.data.token === 'string').toBe(true)
      expect(res.body.data.token.length).toBeGreaterThan(10)
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_UPGRADED_ACCOUNT)
      done()
    })
  })

})

