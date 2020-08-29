const nanoid = require('nanoid').nanoid;

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (name) => {

  return async context => {

    const hasEmail = context.data && context.data.email;

    if (hasEmail) {
      context.data[name] = nanoid();
    }

    return context;
  };
};
