const { authenticate } = require('@feathersjs/authentication').hooks
const { hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

const queryOwnerFromUser = require('../../hooks/query-owner-from-user')
const ifHasProperty = require('../../hooks/if-has-property')
const sendEmail = require('../../hooks/send-email')
const timeStamp = require('../../hooks/time-stamp')
const limitToRole = require('../../hooks/limit-to-role')
const limitToUser = require('../../hooks/limit-to-user')
const createNanoId = require('../../hooks/create-nano-id')
const emailIsUnique = require('../../hooks/email-is-unique')
const userValidate = require('../../hooks/user-validate')
const userPreGetMe = require('../../hooks/user-pre-get-me')
const userPreCreate = require('../../hooks/user-pre-create')
const userPostCreate = require('../../hooks/user-post-create')
const userPostGetMe = require('../../hooks/user-post-get-me')
const userIsVerified = require('../../hooks/user-is-verified')
const userIsAnonRenewToken = require('../../hooks/user-is-anon-renew-token')
const addMessage = require('../../hooks/add-message')
const resultToData = require('../../hooks/result-to-data')

module.exports = {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      limitToRole('admin'),
      queryOwnerFromUser(false),
    ],
    get: [
      authenticate('jwt'),
      userPreGetMe,
      limitToUser
    ],
    create: [
      userValidate.create,
      emailIsUnique,
      userPreCreate,
      hashPassword('password'),
      timeStamp('created_at'),
      createNanoId('verify')
    ],
    update: [
      userValidate.create,
      authenticate('jwt'),
      limitToUser,
      userIsVerified,
      hashPassword('password'),
      timeStamp('updated_at'),
      createNanoId('verify')
    ],
    patch: [
      userValidate.patch,
      authenticate('jwt'),
      limitToUser,
      userIsVerified,
      hashPassword('password'),
      timeStamp('updated_at'),
      createNanoId('verify'),
    ],
    remove: [
      authenticate('jwt'),
      limitToUser
    ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [ userPostGetMe ],
    create: [
      userPostCreate,
      ifHasProperty('data.email', sendEmail('create')),
      addMessage('create')
    ],
    update: [
      resultToData('user'),
      ifHasProperty('data.email', sendEmail('verify')),
      addMessage('update')
    ],
    patch: [
      resultToData('user'),
      ifHasProperty('data.email', sendEmail('verify')),
      addMessage('update' ),
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
