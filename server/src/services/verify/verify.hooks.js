const { protect } = require('@feathersjs/authentication-local').hooks;
const { authenticate } = require('@feathersjs/authentication').hooks;
const disallow = require('../../hooks/disallow')
const addMessage = require('../../hooks/add-message')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ disallow('external') ],
    get: [],
    create: [ disallow('external') ],
    update: [ disallow('external') ],
    patch: [ disallow('external') ],
    remove: [ disallow('external') ]
  },

  after: {
    all: [ protect('password', 'verify', 'recover') ],
    find: [],
    get: [ addMessage('verify') ],
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
