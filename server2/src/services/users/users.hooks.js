const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const timeStamp = require('../../hooks/time-stamp');
const createNanoId = require('../../hooks/create-nano-id');
const userValidate = require('../../hooks/user-validate');
const userIsVerified = require('../../hooks/user-is-verified');

module.exports = {
  before: {
    all: [],
    find: [  ],
    // find: [ authenticate('jwt') ],
    get: [ ],
    // get: [ authenticate('jwt') ],
    create: [
      userValidate.create(),
      hashPassword('password'),
      timeStamp('created_at'),
      createNanoId('verify')],
    update: [
      userValidate.create(),
      userIsVerified(),
      authenticate('jwt'),
      hashPassword('password'),
      timeStamp('updated_at'),
      createNanoId('verify')],
    patch: [
      userValidate.patch(),
      userIsVerified(),
      // authenticate('jwt'),
      hashPassword('password'),
      timeStamp('updated_at'),
      createNanoId('verify'),
    ],
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
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
