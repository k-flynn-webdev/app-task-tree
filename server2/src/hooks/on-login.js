// Use this hook to manipulate incoming or outgoing data.
const get = require('lodash').get;

/**
 * Update a User `login_at` after a successful login
 */
module.exports = async (context) => {

  const constants = context.app.get('constants')

  const userId = get(context, 'result.user.id', null)
  if (!userId) return context

  // only executing, not waiting
  context.app.service(constants.path.users)
    ._patch(userId, { login_at: new Date() }, context.params)

  return context
}
