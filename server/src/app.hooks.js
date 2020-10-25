// Application hooks that run for every service
const handleErrors = require('./hooks/handle-errors');
const { protect } = require('@feathersjs/authentication-local').hooks;
const queryDefault = require('./hooks/query-default')
const cleanQuery = require('./hooks/clean-query')
const allowedQueries = require('../constants/allowed-queries')

module.exports = {
  before: {
    all: [
      handleErrors,
      cleanQuery(allowedQueries)
    ],
    find: [ queryDefault ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ protect('password', 'verify', 'recover') ],
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
