// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');

/**
 * Adds User.Id as `data[Owner]`
 *
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = (context) => {

  if (!context.params.user) {
    throw new BadRequest('User Id missing', {})
  }

  if (!context.data) { context.data = {} }

  context.data.owner = context.params.user.id

  return context
}
