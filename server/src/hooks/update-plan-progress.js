// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');
// const updateProjectProgress = require('./update-project-progress')('projectId')

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
      throw new BadRequest('missing plan location ' + plan, {})
    }

    const paths = context.app.get('constants').path

    const allTasks = await context.app.service(paths.task)._find({
      query: {
        $limit: 0,
        plan: planId
      }
    })
    const allDoneTasks = await context.app.service(paths.task)._find({
      query: {
        $limit: 0,
        plan: planId,
        is_done: {
          $gte: 1
        }
      }
    })

    let planUpdate = {
      updated_at: new Date(),
      total: allTasks.total,
      progress: allDoneTasks.total
    }

    if (planUpdate.total === planUpdate.progress &&
      planUpdate.total !== 0) {
      planUpdate.is_done = true
      planUpdate.done_at = new Date()
    } else {
      planUpdate.is_done = false
      planUpdate.done_at = null
    }

    await context.app.service(paths.plan)._patch(planId, planUpdate)
      .catch(err => {
        context.app.log(err)
        return context
      })

    // todo pull this out into it's own mini hook ..
    // I think this is no longer needed?? -kf
    if (context.plan) {
      if (!!context.plan.is_done !== !!planUpdate.is_done) {
        context.updateProject = true
      }
    }

    return context
  }
}
