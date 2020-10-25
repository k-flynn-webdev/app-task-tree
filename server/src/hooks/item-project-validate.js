// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const joi = require('@hapi/joi')
const validateLoop = require('../helpers/validate-loop')

const checkProject = joi.number().label('project').required()

module.exports = (context) => {
  const checkVars = [
    [checkProject, 'project', true]
  ]

  context.data.project = Number(context.data.project)

  validateLoop(checkVars, context)

  return context
}
