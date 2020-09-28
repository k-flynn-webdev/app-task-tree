// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');

/**
 * Update a projects progress, to be triggered by a plan updating..
 *
 * @param {string} project ID location
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = (project) => {
  return async context => {

    const projectId = get(context, project)

    if (!projectId) {
      throw new BadRequest('missing project location', {})
    }

    const paths = context.app.get('constants').path

    const allPlans = await context.app.service(paths.plan)._find({
      query: { $limit: 0, project: projectId }
    })
    const allDonePlans = await context.app.service(paths.plan)._find({
      query: { $limit: 0, project: projectId, is_done: 1 }
    })

    let projectData = {
      updated_at: new Date(),
      total: allPlans.total,
      progress: allDonePlans.total
    }

    if (projectData.total === projectData.progress &&
      projectData.total !== 0) {
      projectData.is_done = true
      projectData.done_at = new Date()
    } else {
      projectData.is_done = false
      projectData.done_at = null
    }

    context.app.service(paths.project)._patch(projectId, projectData)

    // future todo
    // if (context.project) {
    //   if (!!context.project.is_done !== !!projectData.is_done) {
    //     context.updateAll = true
    //   }
    // }

    return context
  }
}
