const { authenticate } = require('@feathersjs/authentication').hooks;

const limitToProjectOwner = require('../../hooks/limit-to-project-owner')
const projectValidate = require('../../hooks/project-validate')
const timeStamp = require('../../hooks/time-stamp');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      limitToProjectOwner,
      (ctx) => console.log(ctx.params)
    ],
    get: [
      limitToProjectOwner,
      () => console.log('in projects')
    ],
    create: [
      projectValidate.create,
      timeStamp('created_at') ],
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
    create: [],
    update: [],
    patch: [],
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
};
