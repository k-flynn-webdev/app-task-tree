const { authenticate } = require('@feathersjs/authentication').hooks

const queryOwnerFromUser = require('../../hooks/query-owner-from-user')
const itemValueValidate = require('../../hooks/item-value-validate')
const resultToData = require('../../hooks/result-to-data')
const setOwnerFromUser = require('../../hooks/set-owner-from-user')
const timeStamp = require('../../hooks/time-stamp')
const cleanData = require('../../hooks/clean-data')
const allowedQueries = require('../../../constants/allowed-queries')
const onProjectDelete = require('../../hooks/on-project-delete')
const onLogActivity = require('../../hooks/on-log-activity')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      queryOwnerFromUser(true),
    ],
    get: [
      queryOwnerFromUser(true),
    ],
    create: [
      cleanData(allowedQueries),
      itemValueValidate.create,
      setOwnerFromUser,
      timeStamp('created_at')
    ],
    update: [
      // todo : allow ONLY value data property
      queryOwnerFromUser(true),
      cleanData(allowedQueries),
      itemValueValidate.update,
      timeStamp('updated_at')
    ],
    patch: [
      // todo : allow ONLY value data property
      queryOwnerFromUser(true),
      cleanData(allowedQueries),
      itemValueValidate.patch,
      timeStamp('updated_at')
    ],
    remove: [ queryOwnerFromUser(true) ]
  },

  after: {
    all: [],
    find: [],
    get: [ resultToData() ],
    create: [
      resultToData(),
      onLogActivity('project create')
    ],
    update: [
      resultToData(),
      onLogActivity('project update')
    ],
    patch: [
      resultToData(),
      onLogActivity('project update')
    ],
    remove: [
      resultToData(),
      onProjectDelete,
      onLogActivity('project delete')
    ]
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
