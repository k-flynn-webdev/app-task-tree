const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

/**
 * Ensures task property exists
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.task)) {
    exit(res, 400, missing('task'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks task is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.task)) {
    if (!has.isANumber(req.body.task)) {
      exit(res, 400, 'The task must be valid.')
      return false
    }

    if (req.body.task < 0) {
      exit(res, 400, 'The task must be valid.')
      return false
    }
  }

  return true
}

exports.valid = valid

/**
 * Ensure the incoming request has a task param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasParam(req, res) {
  if (!has.hasAnItem(req.params.task)) {
    return false
  }

  return has.isANumber(req.params.task)
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a task query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasQuery(req, res) {
  if (!has.hasAnItem(req.query.task)) {
    return false
  }

  return has.isANumber(req.query.task)
}

exports.HasQuery = HasQuery