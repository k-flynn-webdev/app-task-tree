// Application hooks that run for every service
const handleErrors = require('./hooks/handle-errors');
const { protect } = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [handleErrors],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [protect(['password', 'user', 'recover'])],
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
