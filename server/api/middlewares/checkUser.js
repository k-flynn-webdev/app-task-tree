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

/**
 * Ensure the incoming request has a user param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasParam(req, res) {
  if (!has.hasAnItem(req.params.user)) {
    return false
  }

  return has.isANumber(req.params.user)
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a user query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasQuery(req, res) {
  if (!has.hasAnItem(req.query.user)) {
    return false
  }

  return has.isANumber(req.query.user)
}

exports.HasQuery = HasQuery
