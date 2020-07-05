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

function addRecover (id) {
  return userService.Update({id: id, recover: 'sfs3rwefsgdyr5e45tergvrgfdwewrt4efr' })
}

function clearRecover (id) {
  return userService.Update({id: id, recover: false })
}

function addVerify (id) {
  return userService.Update({id: id, verify: 'sfs3rwefsgdyr5e45tergvrgfdwewrt4efr' })
}

function clearVerify (id) {
  return userService.Update({id: id, verify: false })
}

beforeAll(() => {
  dbConnection.Connect()
  return dbConnection.SelectDB(config.db.database)
})

afterAll(() => {
  dbConnection.Close()
})

const temp_user = { name: 'sdfsfs1', email: 'sfsdf@sdfs1f.com', password: 'sdffAA23111fsdf' };


describe('User', () => {

  it('Login a user account', (done) => {
    return createAccount(temp_user)
    .then(() => {
      return chai.request(config.ip + ':' + config.port)
      .post(constants.paths.API_USER_LOGIN)
      .send(temp_user)
    })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body.data).toBeDefined()
      expect(res.body.data.account).toBeDefined()
      expect(res.body.data.account.id).toBeDefined()
      expect(res.body.data.account.email).toBeDefined()
      expect(res.body.data.account.name).toBeDefined()
      expect(res.body.data.token).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_LOGIN_ACCOUNT)
      done()

      tokenHeader = res.body.data.token
    })
  })

  let tokenHeader = null

  it('Logout a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_USER_LOGOUT)
    .set({ "Authorization": `Bearer ${tokenHeader}` })
    .send(temp_user)
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body.data).toBeDefined()
      expect(res.body.data.account).toBeNull()
      expect(res.body.data.token).toBeNull()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_LOGOUT_ACCOUNT)
      done()
    })
  })

  // todo test for verify process
  // todo test for recover process
  // todo test for anon upgrade
  // todo test for escaping/script hacking

})

