const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const timeStamp = require('../../hooks/time-stamp');
const createNanoId = require('../../hooks/create-nano-id');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword('password'),
      timeStamp('created_at'),
      createNanoId()],
    update: [
      authenticate('jwt'),
      hashPassword('password'),
      timeStamp('updated_at'),
      createNanoId()],
    patch: [
      // authenticate('jwt'),
      createNanoId(),
      hashPassword('password'),
      timeStamp('updated_at')],
    remove: [
      authenticate('jwt') ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
