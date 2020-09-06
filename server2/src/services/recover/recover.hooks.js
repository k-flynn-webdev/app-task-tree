const { hashPassword, protect
} = require('@feathersjs/authentication-local').hooks
const userValidate = require('../../hooks/user-validate')
const disallow = require('../../hooks/disallow')
const timeStamp = require('../../hooks/time-stamp')
const sendEmail = require('../../hooks/send-email')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [ disallow('external') ],
    create: [ disallow('external') ],
    update: [ disallow('external') ],
    patch: [
      userValidate.recover,
      hashPassword('password'),
      ctx => {
        ctx.data.recover = null
        return ctx
      },
      timeStamp('updated_at')],
    remove: [ disallow('external') ]
  },

  after: {
    all: [ protect('password') ],
    find: [
      sendEmail('recover')
    ],
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
