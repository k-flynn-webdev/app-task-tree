const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

const TEXT_LENGTH = 4

/**
 * Validates name text length
 *
 * @param     {string}    input   task text
 * @returns   {boolean}
 */
function validNameText(input) {
  return (input.toString().length >= TEXT_LENGTH)
}

/**
 * Ensures name property to exist
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.name)) {
    exit(res, 422, missing('name'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks name is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.name)) {
    if (!validNameText(req.body.name.trim())) {
      exit(res, 422,
        `The name must be at least ${TEXT_LENGTH} characters long.`)
      return false
    }
  }

  return true
}

exports.valid = valid
