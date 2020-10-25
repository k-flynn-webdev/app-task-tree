// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');

/**
 * Set `data.project` from a `data.plan`
 *
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = async (context) => {
  if(!context.data.plan) {
    throw new BadRequest('missing plan', {})
  }

  const paths = context.app.get('constants').path

  await context.app.service(paths.plan)._get(context.data.plan)
    .then(res => {
      context.data.project = res.project
    })
    .catch(() => {
      throw new BadRequest('missing plan', {})
    })

  return context
}