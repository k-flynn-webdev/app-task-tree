// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors')

/**
 * Checks if a Project owner matches the token Id
 *    if not verified throws an error
 *
 * @return {function(*): *}
 */
const limitToOwner = (context) => {

  if (!context.params.user) {
    const error = new BadRequest('User not found.')
    context.statusCode = 400
    context.dispatch = error
    context.error = error
    return error
  }

  if (!context.params.query) {
    context.params.query = {}
  }

  context.params.query.owner = context.params.user.id

  return context
}

module.exports = limitToOwner
