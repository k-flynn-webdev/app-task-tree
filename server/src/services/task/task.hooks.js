const { authenticate } = require('@feathersjs/authentication').hooks

const queryOwnerFromUser = require('../../hooks/query-owner-from-user')
const itemValueValidate = require('../../hooks/item-value-validate')
const itemPlanValidate = require('../../hooks/item-plan-validate')
const itemIsDoneValidate = require('../../hooks/item-isDone-validate')
const resultToData = require('../../hooks/result-to-data')
const setOwnerFromUser = require('../../hooks/set-owner-from-user')
const setProjectFromPlan = require('../../hooks/set-project-from-plan')
const timeStamp = require('../../hooks/time-stamp')
const cleanData = require('../../hooks/clean-data')
const ifHasProperty = require('../../hooks/if-has-property')
const ifNotHasProperty = require('../../hooks/if-not-has-property')
const allowedQueries = require('../../../constants/allowed-queries')

const getPlan = require('../../hooks/get-plan')
const getProject = require('../../hooks/get-project')
const updatePlanProgress = require('../../hooks/update-plan-progress')
const updateProjectProgress = require('../../hooks/update-project-progress')
const updateTaskIsDone = require('../../hooks/update-task-is_done')

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
      itemPlanValidate,
      setOwnerFromUser,
      setProjectFromPlan,
      timeStamp('created_at')
    ],
    update: [
      queryOwnerFromUser(true),
      // todo : allow ONLY [value & is_done] data property
      cleanData(allowedQueries),
      itemValueValidate.update,
      ifNotHasProperty('data.is_done', timeStamp('updated_at')),
      ifHasProperty('data.is_done', [ updateTaskIsDone ]),
    ],
    patch: [
      queryOwnerFromUser(true),
      // todo : allow ONLY [value & is_done] data property
      cleanData(allowedQueries),
      itemValueValidate.patch,
      ifNotHasProperty('data.is_done', timeStamp('updated_at')),
      ifHasProperty('data.is_done', [ updateTaskIsDone ]),
    ],
    remove: [ queryOwnerFromUser(true) ]
  },

  after: {
    all: [],
    find: [],
    get: [ resultToData ],
    create: [
      resultToData(),
      getPlan('data.plan'),
      getProject('plan.project'),
      updatePlanProgress('plan.id'),
      updateProjectProgress('project.id'),
    ],
    update: [
      resultToData(),
      ifHasProperty('data.is_done', [
        getPlan('result.plan'),
        getProject('result.project'),
      ]),
      ifHasProperty('data.is_done', [
        updatePlanProgress('plan.id'),
        updateProjectProgress('project.id'),
      ])
    ],
    patch: [
      resultToData(),
      ifHasProperty('data.is_done', [
        getPlan('result.plan'),
        getProject('result.project'),
      ]),
      ifHasProperty('data.is_done', [
        updatePlanProgress('plan.id'),
        updateProjectProgress('project.id'),
      ])
    ],
    remove: [
      resultToData(),
      getPlan('result.plan'),
      getProject('result.project'),
      updatePlanProgress('plan.id'),
      updateProjectProgress('project.id'),
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
