const { expect } = require('chai')
const app = require('../../src/app')
const API_PREFIX = '/api/'

describe('\'verify\' service', () => {
  it('registered the service', () => {
    const service = app.service(API_PREFIX + 'verify')

    expect(service).to.not.be.undefined
  })
  it('should throw an error when the verify token mis-matches the users', () => {
    const service = app.service(API_PREFIX + 'verify')
    const verifyToken = 'tokenHere'
    const userObj = { id: 11, role: 'user', verify: 'longStringHere' }

    service.get(verifyToken, { user: userObj })
      .catch(err => {
        expect(err.code).to.equal(400)
        expect(err.type).to.equal('FeathersError')
        expect(err.name).to.equal('BadRequest')
        expect(err.message).to.equal('Invalid verify token.')
      })
  })
  it('should throw an error when user is already verified', () => {
    const service = app.service(API_PREFIX + 'verify')
    const verifyToken = 'tokenHere'
    const userObj = { id: 11, role: 'user', verify: null }

    service.get(verifyToken, { user: userObj })
      .catch(err => {
        expect(err.code).to.equal(400)
        expect(err.type).to.equal('FeathersError')
        expect(err.name).to.equal('BadRequest')
        expect(err.message).to.equal('User already verified.')
      })
  })
  it('should error updating a user that doesnt exist', () => {
    const service = app.service(API_PREFIX + 'verify')
    const verifyToken = 'tokenHere'
    const userObj = { id: 11, role: 'user', verify: verifyToken }

    service.get(verifyToken, { user: userObj })
      .catch(err => {
        expect(err.code).to.equal(404)
        expect(err.type).to.equal('FeathersError')
        expect(err.name).to.equal('NotFound')
        expect(err.message).to.equal('No record found for id \'11\'')
      })
  })
  it('should update a un-verified user when the token matches')
})
