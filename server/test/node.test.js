//Require the dev-dependencies
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)

describe('Node project serves /home', () => {

  it('Should get a body with files', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get('/')
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.header).toBeDefined()
      expect(res.body).toBeDefined()
      done()
    })
  })

})

