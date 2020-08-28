const nanoid = require('nanoid').nanoid;

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = () => {

  return async context => {

    const allowedMethods = [
      'create',
      'update',
      'patch'];

    const hasEmail = context.data && context.data.email;
    const addVerify = allowedMethods.includes(context.method) && hasEmail;

    if (addVerify) {
      context.data['verify'] = nanoid();
    }

    return context;
  };
};
