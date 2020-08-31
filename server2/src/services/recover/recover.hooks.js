const { hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const userValidate = require('../../hooks/user-validate');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      userValidate.recover(),
      hashPassword('password') ],
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
