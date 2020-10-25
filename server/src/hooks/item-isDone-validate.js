// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const joi = require('@hapi/joi')
const validateLoop = require('../helpers/validate-loop')

const checkIsDone = joi.boolean().label('is_done').required()

const create = (context) => {
  const checkVars = [
    [checkIsDone, 'is_done', false]
  ]

  validateLoop(checkVars, context)

  return context
}

exports.create = create
exports.update = create

const patch = (context) => {
  const checkVars = [
    [checkIsDone, 'is_done', false]
  ]

  validateLoop(checkVars, context)

  return context
}

exports.patch = patch
