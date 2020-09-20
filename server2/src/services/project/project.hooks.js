const { authenticate } = require('@feathersjs/authentication').hooks;

const timeStamp = require('../../hooks/time-stamp');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [ () => console.log('in projects') ],
    create: [timeStamp('created_at')],
    update: [timeStamp('updated_at')],
    patch: [timeStamp('updated_at')],
    remove: []
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
