// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');
// const updateProjectProgress = require('./update-project-progress')('projectId')

/**
 * Attaches the `Task` object to context obj
 *
 * @param {string} task ID location
 * @param {object} context
 * @return {function(*): *}
 */
module.exports = (task) => {
  return async context => {

    const taskId = get(context, task)

    if (!taskId) {
      throw new BadRequest('missing task location', {})
    }

    const paths = context.app.get('constants').path
    context.task = await context.app.service(paths.task)._get(taskId)

    return context
  }
}
