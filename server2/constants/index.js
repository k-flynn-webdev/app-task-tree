const MESSAGE_SUCCESS = 'Success, your account is ready'
const MESSAGE_UPDATED = 'Success, your account is updated'
const MESSAGE_VERIFY = 'Success, your account is now verified'
const MESSAGE_RECOVER = 'Success, your password has now been updated'
const MESSAGE_RECOVER_SENT = 'Success, an email was sent'
const MESSAGE_LOGIN = 'Successful login'
const MESSAGE_LOGOUT = 'Successful logout'

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

const EMAIL = 'email'
const USERS = 'users'
const VERIFY = 'verify'
const RECOVER = 'recover'
const AUTHENTICATION = 'authentication'
const PROJECT = 'project'
const PLAN = 'plan'
const TASK = 'task'

const ALL_PATHS = [
  EMAIL,
  USERS,
  VERIFY,
  RECOVER,
  AUTHENTICATION,
  PROJECT,
  PLAN,
  TASK
]

const paths = (prefix) => {
  return ALL_PATHS.reduce((acc, item) => {
    acc[item.toLowerCase()] = prefix + item.toLowerCase()
    return acc
  }, {})
}

/**
 * Adds global constants to the APP in a accessible getter `constants`
 *
 * @param app
 * @return {*}
 */
const init = (app) => {
  const prefix = app.get('apiPath').length > 0 ? app.get('apiPath') + '/' : ''

  const obj ={
    /** Message to return to User */
    message: ALL_MESSAGES,
    /** Path to all services */
    path: paths(prefix),
    /** Useful dict of items */
    dict: ALL_DICT
  }

  app.set('constants', obj)

  return app
}

module.exports = init
