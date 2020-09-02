const { hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const userValidate = require('../../hooks/user-validate');
const timeStamp = require('../../hooks/time-stamp');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      userValidate.recover,
      hashPassword('password'),
      ctx => { ctx.data.recover = null; return ctx; },
      timeStamp('updated_at')],
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
