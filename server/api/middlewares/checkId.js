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
    exit(res, 400, missing('id'))
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
      exit(res, 400, 'The id must be valid.')
      return false
    }
  }

  return true
}

exports.valid = valid

/**
 * Ensure the incoming request has a id param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasParam(req, res) {
  if (!has.hasAnItem(req.params.id)) {
    return false
  }

  return has.isANumber(req.params.id)
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a id query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasQuery(req, res) {
  if (!has.hasAnItem(req.query.id)) {
    return false
  }

  return has.isANumber(req.query.id)
}

exports.HasQuery = HasQuery