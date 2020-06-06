const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

/**
 * Ensures user property to exist
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.user)) {
    exit(res, 422, missing('user'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks user is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.user)) {
    if (!has.isANumber(req.body.user)) {
      exit(res, 422, 'The user must be valid.')
      return false
    }
  }

  return true
}

exports.valid = valid
