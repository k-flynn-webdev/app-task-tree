// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');

/**
 * Adds User.Id as `query[Owner]`
 *    IF admin query[showAll] will ignore the owner query param
 *
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = (context) => {

  if (!context.params.user) {
    throw new BadRequest('User Id missing', {})
  }

  if (!context.params.query) {
    context.params.query = {}
  }

  if (context.params.user.role === 'admin' &&
    context.params.query.showAll) {
    delete context.params.query.owner
    delete context.params.query.showAll
    return context
  }

  context.params.query.owner = context.params.user.id

  return context
}
