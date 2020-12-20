// Use this hook to manipulate incoming or outgoing data.
const get = require('lodash').get;

/**
 * Update activity log with a message prefixed with user id
 *
 * @param {string}   message   message to append to log entry
 */
module.exports = (message) => {
  return async context => {

    let user_id = null
    const userIdResult = get(context, 'result.user.id', null)
    const userIdParam = get(context, 'params.user.id', null)
    const userIdAlt = get(context, 'user.id', null)
    const itemId = get(context, 'result.id', 'x')
    if (userIdResult || userIdParam || userIdAlt) {
      if(userIdResult) user_id = userIdResult
      if(userIdParam) user_id = userIdParam
      if(userIdAlt) user_id = userIdAlt
    }

    if (user_id) {
      context.app.log.activity(`user - ${user_id} - ${message} - ${itemId}`)
    } else {
      context.app.log.activity(`user - x - ${message} - ${itemId}`)
    }

    return context
  }
}
