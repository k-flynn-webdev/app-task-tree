//Require the dev-dependencies
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)


describe('User', () => {

  it('Should create a user account', (done) => {
    // todo
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_USER)
    .send({
      name: 'testName',
      email: 'email.user@temp.co.uk',
      password: 'test123FOUR'
    })
    .end(function(err, res){
      console.log(res.body)
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

})

