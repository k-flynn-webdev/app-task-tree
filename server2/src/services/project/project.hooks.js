const { authenticate } = require('@feathersjs/authentication').hooks

const limitToProjectOwner = require('../../hooks/limit-to-project-owner')
const projectValidate = require('../../hooks/project-validate')
const resultToData = require('../../hooks/result-to-data')
const userToOwner = require('../../hooks/user-to-owner')
const timeStamp = require('../../hooks/time-stamp')


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      limitToProjectOwner,
    ],
    get: [
      limitToProjectOwner,
    ],
    create: [
      projectValidate.create,
      userToOwner,
      timeStamp('created_at')
    ],
    update: [
      limitToProjectOwner,
      projectValidate.update,
      timeStamp('updated_at')
    ],
    patch: [
      limitToProjectOwner,
      projectValidate.patch,
      timeStamp('updated_at')
    ],
    remove: [ limitToProjectOwner ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ resultToData ],
    update: [ resultToData ],
    patch: [ resultToData ],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
