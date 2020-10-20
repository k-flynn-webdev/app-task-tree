// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;


/**
 * Set default query
 *
 * @return {Promise}
 */
module.exports = (context) => {
  if (!get(context, 'params.query.$sort')) {
    context.params.query.$sort = { created_at: -1 }
  }

  return context
}
