// Use this hook to manipulate incoming or outgoing data.
const get = require('lodash').get;

/**
 * Update activity log with a message prefixed with user id
 *
 * @param {string}   message   message to append to log entry
 */
module.exports = (message) => {
  return async context => {

    const userIdResult = get(context, 'result.user.id', null)
    const userIdParam = get(context, 'params.user.id', null)
    const userIdAlt = get(context, 'user.id', null)

    const user_id = [ userIdResult, userIdParam, userIdAlt ].join('').trim()
    let preMsg = user_id ? `user - ${user_id} -` : 'user - x -'

    const itemId = get(context, 'result.id', null)
    let postMsg = itemId ? `- ${itemId}` : ''

    context.app.log.activity([ preMsg, message, postMsg ].join(' '))

    return context
  }
}
