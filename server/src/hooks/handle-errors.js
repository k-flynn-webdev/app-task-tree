// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = ctx => {
  if (ctx.error) {
    const error = ctx.error;
    if (!error.code) {
      ctx.error = new errors.GeneralError('server error');
      return ctx;
    }
    if (error.code === 404 || process.env.NODE_ENV === 'production') {
      error.stack = null;
    }
    return ctx;
  }
};
