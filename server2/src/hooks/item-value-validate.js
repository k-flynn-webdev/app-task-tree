// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const joi = require('@hapi/joi')
const validateLoop = require('../helpers/validate-loop')

const checkValue = joi.string().label('value').min(3).required()

const create = (context) => {
  const checkVars = [
    [checkValue, 'value', true]
  ]

  validateLoop(checkVars, context)

  return context
}

exports.create = create
exports.update = create

const patch = (context) => {
  const checkVars = [
    [checkValue, 'value', false]
  ]

  validateLoop(checkVars, context)

  return context
}

exports.patch = patch
