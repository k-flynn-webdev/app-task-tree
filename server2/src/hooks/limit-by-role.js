// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');
// todo use constants file here

/**
 * Limit access to resources by role
 *
 * @params {string}   role    role to limit by
 * @return {function(*)}
 */
const limitByRole = (role) => {
  return context => {

    if (context.params.user) {

      const roleMatches = context.params.user.role === role;

      if (!roleMatches) {
        context.statusCode = 400;
        const error = new BadRequest('User role not allowed.');
        context.dispatch = error;
        return error;
      }
    }

    return context;
  };
};

module.exports = limitByRole;
