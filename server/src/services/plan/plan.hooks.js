const { authenticate } = require('@feathersjs/authentication').hooks

const queryOwnerFromUser = require('../../hooks/query-owner-from-user')
const itemValueValidate = require('../../hooks/item-value-validate')
const itemProjectValidate = require('../../hooks/item-project-validate')
const resultToData = require('../../hooks/result-to-data')
const setOwnerFromUser = require('../../hooks/set-owner-from-user')
const timeStamp = require('../../hooks/time-stamp')
const cleanData = require('../../hooks/clean-data')
const allowedQueries = require('../../../constants/allowed-queries')
const onLogActivity = require('../../hooks/on-log-activity')

const onPlanDelete = require('../../hooks/on-plan-delete')

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
      itemProjectValidate,
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
      onLogActivity('plan create')
      // getPlan('result.plan'),
      // getProject('result.project'),
      // updatePlanProgress('plan.id'),
      // updateProjectProgress('project.id'),
    ],
    update: [
      resultToData(),
      onLogActivity('plan update')
      // ifHasProperty('data.is_done',
      //   getPlan('result.plan')),
      // ifHasProperty('data.is_done',
      //   getProject('result.project')),
      // ifHasProperty('data.is_done',
      //   updatePlanProgress('plan.id')),
      // ifHasProperty('projectUpdate',
      //   updateProjectProgress('project.id')),
    ],
    patch: [
      resultToData(),
      onLogActivity('plan update')
      // ifHasProperty('data.is_done',
      //   getPlan('result.plan')),
      // ifHasProperty('data.is_done',
      //   getProject('result.project')),
      // ifHasProperty('data.is_done',
      //   updatePlanProgress('plan.id')),
      // ifHasProperty('projectUpdate',
      //   updateProjectProgress('project.id')),
    ],
    remove: [
      resultToData(),
      onPlanDelete,
      onLogActivity('plan delete')
      // getPlan('result.plan'),
      // getProject('result.project'),
      // updatePlanProgress('plan.id'),
      // updateProjectProgress('project.id'),
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
