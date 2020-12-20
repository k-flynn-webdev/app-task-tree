// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');

/**
 * Adds User.Id as `data[Owner]`
 *    If role is an `admin` && `data[Owner]` will not be overwritten
 *
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = (context) => {

  if (!context.params.user) {
    throw new BadRequest('User Id missing', {})
  }

  if (!context.data) { context.data = {} }

  // if (context.params.user.role === 'admin' &&
  //   context.params.query.owner) {
  //   return context
  // }

  context.data.owner = context.params.user.id

  return context
}
