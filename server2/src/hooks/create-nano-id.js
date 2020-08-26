const nanoid = require('nanoid').nanoid;

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = () => {

  return async context => {

    let addVerify = false;

    if (context.method === 'create') {
      addVerify = true;
    }
    if (context.method === 'update') {
      addVerify = true;
    }
    if (context.method === 'patch' &&
    context.data &&
    context.data.email) {
      addVerify = true;
    }

    if (addVerify) {
      context.data['verify'] = nanoid();
    }

    return context;
  };
};
