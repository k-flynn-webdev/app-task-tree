// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Returns the result of User `user/ME`
 *
 * @param context
 * @return {Promise<*>}
 */
module.exports = async (context) => {
  if (context.me) {
    context.dispatch = { user: context.dispatch }
  }

  return context
}
