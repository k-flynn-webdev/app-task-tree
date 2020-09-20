const { authenticate } = require('@feathersjs/authentication').hooks;

const limitToProjectOwner = require('../../hooks/limit-to-project-owner')
const timeStamp = require('../../hooks/time-stamp');

// todo validate all incoming requests like on user

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
    create: [ timeStamp('created_at') ],
    update: [
      limitToProjectOwner,
      timeStamp('updated_at')
    ],
    patch: [
      limitToProjectOwner,
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
