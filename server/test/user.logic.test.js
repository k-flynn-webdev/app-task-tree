//Require the dev-dependencies
const userServiceQueries = require('../services/user.service').ALL_QUERIES
const userService = require('../services/user.service')
const token = require('../services/token.service')
const dbConnection = require('../interfaces/db_init_sql')
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)

const verifyString = 'gdyr5e45tergvrgfdwewrt4efrsfs3rwef1231231sgdyr5e11'

function createAccount (account) {
  return userService.Create(account)
}

function addRecover (id) {
  return userService.Update({id: id, recover: verifyString })
}

function clearRecover (id) {
  return userService.Update({id: id, recover: false })
}

function addVerify (id) {
  return userService.Update({id: id, verify: verifyString })
}

function clearVerify (id) {
  return userService.Update({id: id, verify: false })
}

function clearTable () {
  return dbConnection.Query('TRUNCATE TABLE users')
}
function clearTokens () {
  return dbConnection.Query('TRUNCATE TABLE tokens')
}

beforeAll(() => {
  dbConnection.Connect()
  return dbConnection.SelectDB(config.db.database)
  .then(() => clearTable())
  .then(() => clearTokens())
})

afterAll(() => {
  dbConnection.Close()
})

const temp_user = { name: 'sd1232fsfs1', email: 'sfsdf@sdfs1231f.com', password: 'sdff123123AA23111fsdf' };


describe('User', () => {

  it('Should not return user account details of invalid token', (done) => {
    let userMeToken = 'fyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODIsIm5hbWUiOiJkc3NzZnNkZmRzZiIsImVtYWlsIjoic2RzZGZzZGZkQGRhZGFkZDEuY29tIiwicm9sZSI6InVzZXIiLCJ0aW1lIjoxNTk1MTExMTY3NTA2LCJpYXQiOjE1OTUxMTExNjcsImV4cCI6MTU5NTcxNTk2N30.7uBu0MP6yCy3XoCe5YrKFeMo0sMDl9OMGoS-pSCGBhs'

    return chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER)
      .set({ "Authorization": `Bearer ${userMeToken}` })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.status).toBe(401)
      expect(res.body).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual('JsonWebTokenError')
      done()
    })
  })

  it('Should return user account details', (done) => {
    let userMeAccount = null
    let userMeToken = null

    return createAccount(temp_user)
    .then(({ insertId }) => userService.GetUserByID(insertId))
    .then(([userObj]) => {
      userMeAccount = userObj
      userMeToken = token.Create(userObj)
    })
    .then(() => {
      return chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER)
      .set({ "Authorization": `Bearer ${userMeToken}` })
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
      expect(res.body.data.account.role).toBeDefined()
      expect(res.body.data.account.meta).toBeDefined()
      expect(res.body.data.account.meta.created).toBeDefined()
      expect(res.body.data.account.meta.login).toBeDefined()
      expect(res.body.data.account.meta.updated).toBeDefined()
      expect(res.body.data.account.meta.verified).toBeDefined()
      expect(res.body.data.tasks).toBeDefined()
      expect(res.body.data.tasksDone).toBeDefined()
      expect(res.body.data.projects).toBeDefined()
      expect(res.body.data.projectsDone).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS)
      done()
    })
  })

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

      newUser = res.body.data.account
      tokenHeader = res.body.data.token
      done()
    })
  })

  let newUser = null
  let tokenHeader = null

  it('Logout a user account', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_USER_LOGOUT)
    .set({ "Authorization": `Bearer ${tokenHeader}` })
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

  it('Should not Verify a user account with a missing param', (done) => {
    return addVerify(newUser.id)
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER_VERIFY(1))
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(400)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual('Invalid verify link.')
        done()
      })
    })
  })

  it('Should not Verify a user account with a bad string', (done) => {
    return addVerify(newUser.id)
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER_VERIFY('sfsdfw4rwefesfewrw'))
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(400)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual('Invalid verify link.')
        done()
      })
    })
  })

  it('Verify a user account', (done) => {
    return addVerify(newUser.id)
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER_VERIFY(verifyString))
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.data).toBeDefined()
        expect(res.body.data.account).toBeDefined()
        expect(res.body.data.token).toBeDefined()
        expect(res.body.data.token.length).toBeGreaterThanOrEqual(10)
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual(constants.messages.SUCCESS_VERIFIED_ACCOUNT)
        done()
      })
    })
  })

  it('Should not start Recover process of a user with a invalid email', (done) => {
    return clearRecover(newUser.id)
    .then(() => clearVerify(newUser.id))
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER_RESET('fakeBrokenEmailHere'))
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(400)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual('Invalid email.')
        done()
      })
    })
  })

  it('Should not start Recover process of a user with a fake email', (done) => {
    return clearRecover(newUser.id)
    .then(() => clearVerify(newUser.id))
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER_RESET('fakeBroke@nEmai.lHere'))
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(404)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual(constants.errors.ACCOUNT_MISSING)
        done()
      })
    })
  })

  it('Should start Recover process with correct email address', (done) => {
    return clearRecover(newUser.id)
    .then(() => clearVerify(newUser.id))
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .get(constants.paths.API_USER_RESET(temp_user.email))
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual(constants.messages.SUCCESS_RESET_ACCOUNT)
        done()
      })
    })
  })

  it('Should not Recover a user account with a missing param', (done) => {
    return addRecover(newUser.id)
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_RESET(1))
      .send({ password: 'testTEST1234' })
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(400)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual('Invalid reset link.')
        done()
      })
    })
  })

  it('Should not Recover a user account with a bad string', (done) => {
    return addRecover(newUser.id)
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_RESET('sdfwe45rfrgdrge353wrefsdfwe45rfrgdrge353wrefde25fh'))
      .send({ password: 'testTEST1234' })
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(404)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual(constants.errors.RECOVERY_LINK_MISSING)
        done()
      })
    })
  })

  it('Should not Recover a user account with an invalid new password', (done) => {
    return addRecover(newUser.id)
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_RESET(verifyString))
      .send({ password: 'toosmall' })
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(400)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual('The password must contain numbers.')
        done()
      })
    })
  })

  it('Should Recover a user account with the new password', (done) => {
    return addRecover(newUser.id)
    .then(() => {
      chai.request(config.ip + ':' + config.port)
      .patch(constants.paths.API_USER_RESET(verifyString))
      .send({ password: 'newPassword12345' })
      .then(res => {
        expect(res).toBeDefined()
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.message).toBeDefined()
        expect(res.body.message).toEqual(constants.messages.SUCCESS_PASSWORD_RESET_ACCOUNT)
        done()
      })
    })
  })

  // todo test for escaping/script hacking

})

