// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');

/**
 * Update a plans progress, to be triggered by a task updating..
 *
 * @param {string} plan ID location
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = (plan) => {
  return async context => {

    const planId = get(context, plan)

    if (!planId) {
      throw new BadRequest('missing plan location', {})
    }

    const paths = context.app.get('constants').path

    const allTasks = await context.app.service(paths.task)._find({
      query: { $limit: 0, plan: planId }
    })
    const allDoneTasks = await context.app.service(paths.task)._find({
      query: { $limit: 0, plan: planId, is_done: 1 }
    })

    context.app.service(paths.plan)._patch(planId,
      { total: allTasks.total, progress: allDoneTasks.total } )

    return context
  }
}
