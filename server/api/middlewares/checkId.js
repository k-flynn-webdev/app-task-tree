const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

/**
 * Ensures ID property to exist
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.id)) {
    exit(res, 422, missing('id'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks id is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.id)) {
    if (!has.isANumber(req.body.id)) {
      exit(res, 422, 'The id must be valid.')
      return false
    }
  }

  return true
}

exports.valid = valid
