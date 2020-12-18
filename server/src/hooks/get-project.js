// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');
// const updateProjectProgress = require('./update-project-progress')('projectId')

/**
 * Attaches the `Project` object to context obj
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
    const projectObj = await context.app.service(paths.project)._get(projectId)
      .catch(err => {
        context.app.log_error(err)
        return context
      })

    context.project = projectObj

    return context
  }
}
