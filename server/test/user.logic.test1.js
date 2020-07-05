//Require the dev-dependencies
const userServiceQueries = require('../services/user.service').ALL_QUERIES
const userService = require('../services/user.service')
const dbConnection = require('../interfaces/db_init_sql')
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)


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

const temp_user = { name: 'sdfsfs', email: 'sfsdf@sdfsf.com', password: 'sdffAA11fsdf' };


describe('User', () => {


  // todo test for anon upgrade
  // todo test for login
  // todo test for logout
  // todo test for verify process
  // todo test for recover process
  // todo test for escaping/script hacking

})

