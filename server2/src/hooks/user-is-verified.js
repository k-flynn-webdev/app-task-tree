// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// validation
// const joi = require('@hapi/joi');
// const get = require('lodash').get;

/**
 * Checks if a User is verified
 *    if not verified throws an error
 *
 * @return {function(*): *}
 */
const isVerified = () => {
  return async context => {

    const userId = context.id;
    const userModel = await context.app.service('users').get(userId);

    if (userModel.verify && userModel.verify.length > 3) {
      throw new Error('User must be verified in order to update details.');
    }

    context.resource = userModel;

    return context;
  };
};

module.exports = isVerified;
