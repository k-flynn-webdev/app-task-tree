// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const joi = require('@hapi/joi')
const validateLoop = require('../helpers/validate-loop')

const checkPlan= joi.number().label('plan').required()

module.exports = (context) => {
  const checkVars = [
    [checkPlan, 'plan', true]
  ]

  context.data.plan = Number(context.data.plan)

  validateLoop(checkVars, context)

  return context
}
