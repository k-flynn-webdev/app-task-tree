const MESSAGE_SUCCESS = 'Success, your account is ready'
const MESSAGE_UPDATED = 'Success, your account is updated'
const MESSAGE_VERIFY = 'Success, your account is now verified'
const MESSAGE_RECOVER = 'Success, your password has now been updated'
const MESSAGE_RECOVER_SENT = 'Success, an email was sent'
const MESSAGE_LOGIN = 'Successful login'
const MESSAGE_LOGOUT = 'Successful logout'

/**
 * All API returned messages begin here
 */
const ALL_MESSAGES = {
  create: MESSAGE_SUCCESS,
  update: MESSAGE_UPDATED,
  verify: MESSAGE_VERIFY,
  recover: MESSAGE_RECOVER,
  recoverSent: MESSAGE_RECOVER_SENT,
  login: MESSAGE_LOGIN,
  logout: MESSAGE_LOGOUT
}

const ME = 'me'

const ALL_DICT = {
  me: ME
}

/**
 * All services begin here
 */
const USERS = 'users'
const VERIFY = 'verify'
const RECOVER = 'recover'
const EMAIL = 'email'
const AUTHENTICATION = 'authentication'
const PROJECT = 'projects'
const PLAN = 'plans'
const TASK = 'tasks'

const ALL_PATHS = {
  EMAIL,
  USERS,
  VERIFY,
  RECOVER,
  AUTHENTICATION,
  PROJECT,
  PLAN,
  TASK
}

/**
 * Combines a prefix with the original key of an object item
 *
 * @param {string} prefix   prefix to pre-append to object[key]
 * @param {object} paths    object[key] items
 * @return {{}}
 */
const paths = (prefix, paths) => {
  return Object.entries(paths).reduce((acc, [key, val]) => {
    acc[key.toLowerCase()] = prefix + val.toLowerCase()
    return acc
  }, {})
}

/**
 * Adds global constants to the APP in a accessible getter `constants`
 *    eg: app.get('constants item) ...
 *
 * @param {object}  app
 * @return {*}
 */
const init = (app) => {
  const prefix = app.get('apiPrefix').length > 0 ? `${app.get('apiPrefix')}/` : ''

  const obj ={
    /** Useful dict of items */
    dict: ALL_DICT,
    /** Message to return to User */
    message: ALL_MESSAGES,
    /** Path to all services */
    path: paths(prefix, ALL_PATHS),
  }

  app.set('constants', obj)

  return app
}

module.exports = init
