// Use this hook to manipulate incoming or outgoing data.
const get = require('lodash').get;

/**
 * Update activity log with a message prefixed with user id
 *
 * @param {string}   message   message to append to log entry
 */
module.exports = (message) => {
  return async context => {

    const userParams = []
    ;['result.user.id', 'params.user.id', 'user.id'].forEach(item => {
      userParams.push(get(context, item, null))
    })

    const userId = userParams.join('').trim()
    const preMsg = userId ? `user - ${userId} -` : 'user - x -'

    const itemId = get(context, 'result.id', null)
    const postMsg = itemId ? `- ${itemId}` : ''

    context.app.log.activity(`${preMsg} ${message} ${postMsg}`)

    return context
  }
}
