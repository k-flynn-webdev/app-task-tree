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

const getPlan = require('../../hooks/get-plan')
const getProject = require('../../hooks/get-project')
const updatePlanProgress = require('../../hooks/update-plan-progress')
const updateProjectProgress = require('../../hooks/update-project-progress')
const onPlanDelete = require('../../hooks/on-plan-delete')

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
    get: [ resultToData ],
    create: [
      resultToData,
      // getPlan('result.plan'),
      // getProject('result.project'),
      // updatePlanProgress('plan.id'),
      // updateProjectProgress('project.id'),
    ],
    update: [
      resultToData,
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
      resultToData,
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
      resultToData,
      onPlanDelete
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
