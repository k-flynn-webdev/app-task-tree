// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;

/**
 * Update `is_done` property with the User.id if truthy
 *
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = (context) => {

  const userId = get(context, 'params.user.id')
  const hasIsDone = get(context, 'data.is_done')

  if (hasIsDone === undefined) return context

  if(hasIsDone === 0 ||
  hasIsDone === false) {
    context.data.is_done = 0
    context.data.done_at = null
  } else {
    context.data.is_done = userId
    context.data.done_at = new Date()
  }

  return context
}
