const { authenticate } = require('@feathersjs/authentication').hooks

const queryOwnerFromUser = require('../../hooks/query-owner-from-user')
const itemValueValidate = require('../../hooks/item-value-validate')
const resultToData = require('../../hooks/result-to-data')
const setOwnerFromUser = require('../../hooks/set-owner-from-user')
const timeStamp = require('../../hooks/time-stamp')
const cleanData = require('../../hooks/clean-data')
const allowedQueries = require('../../../constants/allowed-queries')
const onProjectDelete = require('../../hooks/on-project-delete')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      queryOwnerFromUser,
    ],
    get: [
      queryOwnerFromUser,
    ],
    create: [
      cleanData(allowedQueries),
      itemValueValidate.create,
      setOwnerFromUser,
      timeStamp('created_at')
    ],
    update: [
      // todo : allow ONLY value data property
      queryOwnerFromUser,
      cleanData(allowedQueries),
      itemValueValidate.update,
      timeStamp('updated_at')
    ],
    patch: [
      // todo : allow ONLY value data property
      queryOwnerFromUser,
      cleanData(allowedQueries),
      itemValueValidate.patch,
      timeStamp('updated_at')
    ],
    remove: [ queryOwnerFromUser ]
  },

  after: {
    all: [],
    find: [],
    get: [ resultToData() ],
    create: [ resultToData() ],
    update: [ resultToData() ],
    patch: [ resultToData() ],
    remove: [
      resultToData(),
      onProjectDelete
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
