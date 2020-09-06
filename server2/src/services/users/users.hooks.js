const { authenticate } = require('@feathersjs/authentication').hooks
const { hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

const timeStamp = require('../../hooks/time-stamp')
const limitByRole = require('../../hooks/limit-by-role')
const userValidate = require('../../hooks/user-validate')
const createNanoId = require('../../hooks/create-nano-id')
const userIsVerified = require('../../hooks/user-is-verified')
const userMatchesToken = require('../../hooks/user-matches-token')
const userIsAnonRenewToken = require('../../hooks/user-is-anon-renew-token')
const emailIsUnique = require('../../hooks/email-is-unique')
const sendEmail = require('../../hooks/send-email')

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), limitByRole('admin') ],
    get: [ authenticate('jwt'), userMatchesToken ],
    create: [
      userValidate.create,
      emailIsUnique,
      hashPassword('password'),
      timeStamp('created_at'),
      createNanoId('verify')
    ],
    update: [
      userValidate.create,
      authenticate('jwt'),
      userIsVerified,
      hashPassword('password'),
      timeStamp('updated_at'),
      createNanoId('verify')
    ],
    patch: [
      userValidate.patch,
      authenticate('jwt'),
      userIsVerified,
      hashPassword('password'),
      timeStamp('updated_at'),
      createNanoId('verify'),
    ],
    remove: [
      authenticate('jwt'),
      userMatchesToken
    ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [
      sendEmail('create')
    ],
    update: [
      ctx => {
        if (ctx.data.email) {
          sendEmail('verify')
        }
      }
    ],
    patch: [
      ctx => {
        if (ctx.data.email) {
          sendEmail('verify')
        }
      }
    ],
    remove: []
  },

  error: {
    all: [
      userIsAnonRenewToken,
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'verify', 'recover'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
