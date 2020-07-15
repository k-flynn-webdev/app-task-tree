const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

const TEXT_LENGTH = 4

/**
 * Validates task text length
 *
 * @param     {string}    input   task text
 * @returns   {boolean}
 */
function validTaskText(input) {
  return (input.toString().length >= TEXT_LENGTH)
}

/**
 * Ensures text property to exist
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.text)) {
    exit(res, 400, missing('text'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks text is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.text)) {
    if (!validTaskText(req.body.text.trim())) {
      exit(res, 400,
        `The task text must be at least ${TEXT_LENGTH} characters long.`)
      return false
    }
  }

  return true
}

exports.valid = valid

/**
 * Ensure the incoming request has a text param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasParam(req, res) {
  if (!has.hasAnItem(req.params.text)) {
    return false
  }

  return validTaskText(req.params.text)
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a text query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasQuery(req, res) {
  if (!has.hasAnItem(req.query.text)) {
    return false
  }

  return validTaskText(req.query.text)
}

exports.HasQuery = HasQuery