// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// validation
// const joi = require('@hapi/joi');
// const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');

/**
 * Checks if a User is verified
 *    if not verified throws an error
 *
 * @return {function(*): *}
 */
const isVerified = (context) => {

  if (!context.params.user) {
    throw new BadRequest('User has not been found.');
  }

  const userModel = context.params.user;

  if (userModel.verify && userModel.verify.length > 3) {
    throw new BadRequest('User must be verified in order to update details.');
  }

  return context;
};

module.exports = isVerified;
