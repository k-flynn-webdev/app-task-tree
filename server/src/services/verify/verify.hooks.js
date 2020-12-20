const { protect } = require('@feathersjs/authentication-local').hooks;
const { authenticate } = require('@feathersjs/authentication').hooks;
const disallow = require('../../hooks/disallow')
const addMessage = require('../../hooks/add-message')
const ifHasProperty = require('../../hooks/if-has-property')
const sendEmail = require('../../hooks/send-email')
const onLogActivity = require('../../hooks/on-log-activity')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ disallow('external') ],
    update: [ disallow('external') ],
    patch: [ disallow('external') ],
    remove: [ disallow('external') ]
  },

  after: {
    all: [ protect('password', 'verify', 'recover') ],
    find: [ ifHasProperty('params.user.verify',
      [
        ctx => ctx.result = ctx.result.data[0],
        sendEmail('verify'),
        onLogActivity('requested verify email')
      ])
    ],
    get: [
      addMessage('verify'),
      onLogActivity('verify success')
    ],
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
