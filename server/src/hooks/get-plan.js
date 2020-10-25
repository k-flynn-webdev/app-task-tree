// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');
// const updateProjectProgress = require('./update-project-progress')('projectId')

/**
 * Attaches the `Plan` object to context obj
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

    const planObj = await context.app.service(paths.plan)._get(planId)

    context.plan = planObj

  }
}
