// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * If the route is user/ME convert to user/ID
 *
 * @param context
 * @return {Promise<*>}
 */
module.exports = (context) => {
  const constants = context.app.get('constants')

  if (context.params.user && context.id) {
    if (context.id === constants.dict.me) {
      context.id = context.params.user.id
      context.me = true
    }
  }

  return context
}
