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
const ifHasProperty = require('../../hooks/if-has-property')
const allowedQueries = require('../../../constants/allowed-queries')

const updateProjectProgress = require('../../hooks/update-project-progress')

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
      setOwnerFromUser,
      timeStamp('created_at')
    ],
    update: [
      // todo : allow ONLY value data property
      limitToOwner,
      cleanData(allowedQueries),
      itemValueValidate.update,
      timeStamp('updated_at')
    ],
    patch: [
      // todo : allow ONLY value data property
      limitToOwner,
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
    create: [
      resultToData,
      updateProjectProgress('result.project'),
    ],
    update: [
      resultToData,
      ifHasProperty('data.is_done',
        updateProjectProgress('result.project')),
    ],
    patch: [
      resultToData,
      ifHasProperty('data.is_done',
        updateProjectProgress('result.project')),
    ],
    remove: [
      updateProjectProgress('result.id'),
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
