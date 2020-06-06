const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

/**
 * Ensures project property to exist
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.project)) {
    exit(res, 422, missing('project'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks project is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.project)) {
    if (!has.isANumber(req.body.project)) {
      exit(res, 422, 'The project must be valid.')
      return false
    }
  }

  return true
}

exports.valid = valid
