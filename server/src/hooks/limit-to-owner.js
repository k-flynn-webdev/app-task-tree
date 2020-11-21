// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors')

/**
 * Checks if a User Id matches the token Id
 *    if not verified throws an error
 *
 * @return {function(*): *}
 */
const limitToOwner = (context) => {

  if (context.params.user) {

    const userIsAdmin = context.params.user.role === 'admin'
    if (userIsAdmin) return context

    if (Number(context.id) !== context.params.user.id) {
      const error = new BadRequest('User and Token do not match.')
      context.statusCode = 400
      context.dispatch = error
      context.error = error
      return error
    }
  }

  return context
}

module.exports = limitToOwner
