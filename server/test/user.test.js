//Require the dev-dependencies
const userServiceQueries = require('../services/user.service').ALL_QUERIES
const userService = require('../services/user.service')
const dbConnection = require('../interfaces/db_init_sql')
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)

function clearTable () {
  return dbConnection.Query('TRUNCATE TABLE users')
}

function clearVerify (id) {
  return userService.Update({id: id, verify: false })
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

  it('An empty object should fail to create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({})
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('Missing name field.')
      done()
    })
  })

  it('A missing name should fail to create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      email: temp_user.email,
      password: temp_user.password
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('Missing name field.')
      done()
    })
  })

  it('A invalid name should fail to create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: 'bla',
      email: temp_user.email,
      password: temp_user.password
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The name must be at least 4 characters long.')
      done()
    })
  })

  it('A missing email should fail to create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      password: temp_user.password
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('Missing email field.')
      done()
    })
  })

  it('A invalid email should fail to create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      email: 'sdsdf',
      name: temp_user.name,
      password: temp_user.password
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The email must be valid.')
      done()
    })
  })

  it('A invalid email should fail to create a user account #2', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      email: 'a@aa',
      name: temp_user.name,
      password: temp_user.password
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The email must be valid.')
      done()
    })
  })

  it('A missing password should fail to create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      email: temp_user.email
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('Missing password field.')
      done()
    })
  })

  it('A invalid password should fail to create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      email: temp_user.email,
      password: 'aaaaa'
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The password must be at least 8 characters long.')
      done()
    })
  })

  it('A invalid password should fail to create a user account #2', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      email: temp_user.email,
      password: 'aaaaaaaaaaaaaa'
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The password must contain numbers.')
      done()
    })
  })

  it('A invalid password should fail to create a user account #3', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      email: temp_user.email,
      password: 'aaaaaaaaaaaaaa11232'
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The password must contain Uppercase letters.')
      done()
    })
  })

  let userCreated = null

  it('Should create a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: temp_user.name,
      email: temp_user.email,
      password: temp_user.password
    })
    .then(res => {
      userCreated = res.body.data.account
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

      // todo make sure a email is sent to begin verify process

      return dbConnection.Query(userServiceQueries.DB_GET_USER_BY_ID, [userCreated.id])
    })
    .then(([userFound]) => {
      expect(userFound.verify.length).toBeGreaterThan(10)
      done()
    })
  })

  it('An already used email should fail to create a user account', (done) => {
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

  it('Should not be able to update a account without any properties', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_USER)
    .send({
      id: userCreated.id
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('No properties received.')
      done()
    })
  })

  it('Should not be able to update a account with an invalid name', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_USER)
    .send({
      id: userCreated.id,
      name: 'aa'
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The name must be at least 4 characters long.')
      done()
    })
  })

  it('Should not be able to update a account with an invalid email', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_USER)
    .send({
      id: userCreated.id,
      email: 'aa'
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The email must be valid.')
      done()
    })
  })

  it('Should not be able to update a account with an invalid password', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_USER)
    .send({
      id: userCreated.id,
      password: 'aa'
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('The password must be at least 8 characters long.')
      done()
    })
  })

  it('Should not be able to update a account with that still needs to be verified', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_USER)
    .send({
      id: userCreated.id,
      name: 'newNameHere'
    })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(401)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('Account not verified, please verify first.')
      done()
    })
  })

  it('Should update a account name that has been verified', (done) => {
    clearVerify(userCreated.id)
    .then(() => {
      return chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER)
      .send({
        id: userCreated.id,
        name: 'newNameHere'
      })
    })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_UPDATED_ACCOUNT)
      expect(res.body.data).toBeDefined()
      expect(res.body.data.account).toBeDefined()
      expect(res.body.data.account.id).toBeDefined()
      expect(res.body.data.account.name).toBeDefined()
      expect(res.body.data.account.email).toBeDefined()
      expect(res.body.data.account.role).toBeDefined()
      expect(res.body.data.token).toBeDefined()
      expect(res.body.data.token.length).toBeGreaterThan(10)
      done()
    })
  })

  it('Should update a account email and trigger the verify process', (done) => {
    clearVerify(userCreated.id)
    .then(() => {
      return chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER)
      .send({
        id: userCreated.id,
        email: 'aa@aaaaa.com'
      })
    })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_UPDATED_ACCOUNT)
      expect(res.body.data).toBeDefined()
      expect(res.body.data.account).toBeDefined()
      expect(res.body.data.account.id).toBeDefined()
      expect(res.body.data.account.name).toBeDefined()
      expect(res.body.data.account.email).toBeDefined()
      expect(res.body.data.account.role).toBeDefined()
      expect(res.body.data.token).toBeDefined()
      expect(res.body.data.token.length).toBeGreaterThan(10)
      return dbConnection.Query(userServiceQueries.DB_GET_USER_BY_ID, [userCreated.id])
    })
    .then(([result]) => {
      expect(result.verify.length).toBeGreaterThanOrEqual(10)
      done()
    })
  })

  // todo test for updating
  // todo test for updating event
  // todo test for deleteing
  // todo test for deleteing event
  // todo test for escaping/script hacking

})

