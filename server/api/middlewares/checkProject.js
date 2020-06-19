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

    if (req.body.project < 0) {
      exit(res, 422, 'The project must be valid.')
      return false
    }
  }

  return true
}

exports.valid = valid

/**
 * Ensure the incoming request has a project param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasParam(req, res) {
  if (!has.hasAnItem(req.params.project)) {
    return false
  }

  return has.isANumber(req.params.project)
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a project id query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasQuery(req, res) {
  if (!has.hasAnItem(req.query.project)) {
    return false
  }

  return has.isANumber(req.query.project)
}

exports.HasQuery = HasQuery