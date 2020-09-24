const { authenticate } = require('@feathersjs/authentication').hooks

const limitToOwner = require('../../hooks/limit-to-project-owner')
const itemValidate = require('../../hooks/item-validate')
const resultToData = require('../../hooks/result-to-data')
const setOwnerFromUser = require('../../hooks/set-owner-from-user')
const timeStamp = require('../../hooks/time-stamp')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      limitToOwner,
    ],
    get: [
      limitToOwner,
    ],
    create: [
      itemValidate.create,
      setOwnerFromUser,
      timeStamp('created_at')
    ],
    update: [
      limitToOwner,
      itemValidate.update,
      timeStamp('updated_at')
    ],
    patch: [
      limitToOwner,
      itemValidate.patch,
      timeStamp('updated_at')
    ],
    remove: [ limitToOwner ]
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
