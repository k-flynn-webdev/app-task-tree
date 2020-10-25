// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Store user login info for easier post token creation `user-post-login.js`
 *
 * @param context
 * @return {Promise<*>}
 */
module.exports = context => {
  context.email = context.data.email
  context.password = context.data.password

  return context
}
