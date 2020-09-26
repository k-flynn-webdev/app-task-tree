const { authenticate } = require('@feathersjs/authentication').hooks

const limitToOwner = require('../../hooks/limit-to-project-owner')
const itemValueValidate = require('../../hooks/item-value-validate')
const itemProjectValidate = require('../../hooks/item-project-validate')
const itemPlanValidate = require('../../hooks/item-plan-validate')
const itemIsDoneValidate = require('../../hooks/item-isDone-validate')
const resultToData = require('../../hooks/result-to-data')
const setOwnerFromUser = require('../../hooks/set-owner-from-user')
const timeStamp = require('../../hooks/time-stamp')
const cleanData = require('../../hooks/clean-data')
const allowedQueries = require('../../../constants/allowed-queries')

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
      cleanData(allowedQueries),
      itemValueValidate.create,
      itemProjectValidate,
      itemPlanValidate,
      setOwnerFromUser,
      timeStamp('created_at')
    ],
    update: [
      limitToOwner,
      // todo : allow ONLY [value & is_done] data property
      cleanData(allowedQueries),
      itemValueValidate.update,
      itemIsDoneValidate,
      timeStamp('updated_at')
    ],
    patch: [
      limitToOwner,
      // todo : allow ONLY [value & is_done] data property
      cleanData(allowedQueries),
      itemValueValidate.patch,
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
