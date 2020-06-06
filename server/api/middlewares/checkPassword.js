const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

const TEXT_LENGTH = 8

/**
 * Validates password text length
 *
 * @param     {string}    input   task text
 * @returns   {boolean}
 */
function validPasswordLength(input) {
  return (input.toString().length >= TEXT_LENGTH)
}

/**
 * Ensures password property to exist
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function required(req, res) {
  if (!has.hasAnItem(req.body.password)) {
    exit(res, 422, missing('password'))
    return false
  }

  return valid(req, res)
}

exports.required = required

/**
 * Checks password is valid
 *
 * @param     {object}    req
 * @param     {object}    res
 * @returns   {boolean}
 */
function valid(req, res) {
  if (has.hasAnItem(req.body.password)) {
    if (!validPasswordLength(req.body.password.trim())) {
      exit(res, 422,
        `The password must be at least ${TEXT_LENGTH} characters long.`)
      return false
    }

    if (!has.HasNumbers(req.body.password.trim())) {
      exit(res, 422,
        `The password must contain numbers.`)
      return false
    }

    if (!has.HasUpperCase(req.body.password.trim())) {
      exit(res, 422,
        `The password must contain Uppercase letters.`)
      return false
    }
  }

  return true
}

exports.valid = valid
