// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

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

  const constants = context.app.get('constants')

  context.dispatch = await context.app.service(constants.path.authentication).
    create(userLogin, context.params)

  return context
}
