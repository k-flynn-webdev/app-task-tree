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
    exit(res, 400, missing('name'))
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
      exit(res, 400,
        `The name must be at least ${TEXT_LENGTH} characters long.`)
      return false
    }
  }

  return true
}

exports.valid = valid

/**
 * Ensure the incoming request has a name param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasParam(req, res) {
  if (!has.hasAnItem(req.params.name)) {
    return false
  }

  return validNameText(req.params.name.trim())
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a name query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasQuery(req, res) {
  if (!has.hasAnItem(req.query.name)) {
    return false
  }

  return validNameText(req.query.name.trim())
}

exports.HasQuery = HasQuery