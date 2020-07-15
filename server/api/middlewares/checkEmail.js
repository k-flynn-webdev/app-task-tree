const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

/**
 * Validates email
 *
 * @param 	  {string} 	  input		email address
 * @returns   {boolean}
 */
function validEmail(input) {
    let emailTmp = input.trim()
    let tmp = emailTmp.split('@')
    if (emailTmp.length < 5 || tmp.length < 2) return false
    let domainStop = tmp[1].indexOf('.')
    return (domainStop > 0 && domainStop < tmp[1].length - 1)
}

exports.validEmail = validEmail

/**
 * Ensures email property to exist
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.email)) {
    exit(res, 400, missing('email'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks email is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.email)) {
    if (!validEmail(req.body.email)) {
      exit(res, 400, 'The email must be valid.')
      return false
    }
  }

  return true
}

exports.valid = valid

/**
 * Ensure the incoming request has a email param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasParam(req, res) {
  if (!has.hasAnItem(req.params.email)) {
    exit(res, 400, 'Missing email parameter.')
    return false
  }

  if (!validEmail(req.params.email)) {
    exit(res, 400, 'The email parameter must be valid.')
    return false
  }

  return true
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a email query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @returns {boolean}
 */
function HasQuery(req, res) {
  if (!has.hasAnItem(req.query.email)) {
    return false
  }

  return validEmail(req.query.email)
}

exports.HasQuery = HasQuery