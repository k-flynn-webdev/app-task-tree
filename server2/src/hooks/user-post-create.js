// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const constants = require('../../constants/index')

/**
 * Returns the result of User login on user creation
 *    So both `/Login` and `/UserCreate` return the same object
 *
 * @param context
 * @return {Promise<*>}
 */
module.exports = async (context) => {
  const userLogin = {
    email: context.data.email,
    password: context.password,
    strategy: 'local'
  }

  const message = constants.message.create
  const tokenObj = await context.app.service('authentication').
    create(userLogin, context.params)

  context.dispatch = Object.assign(tokenObj, { message })

  return context
}
