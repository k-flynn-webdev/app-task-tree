// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// validation
// const joi = require('@hapi/joi');
// const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors')

/**
 * Checks if a User email is unique
 *    if not throws an error
 *
 * @return {function(*): *}
 */
const emailIsUnique = async (context) => {

  const constants = context.app.get('constants')

  const userFind = await context.app.service(constants.path.users).find(
    { query: { email: context.data.email } })
  if (userFind.total > 0) throw new BadRequest('Email already in use.', {})

  return context
}

module.exports = emailIsUnique
