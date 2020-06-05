const sanitizer = require('sanitizer').sanitize

const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

const TASK_VALUE_LENGTH = 4

/**
 * @return {string}
 */
function Missing(property) {
  return `Missing ${property} field.`
}

/**
 * Ensure the incoming request has a value, project id and user id property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Create(req, res, next) {
  if (!has.Item(req.body.value)) return exit(res, 422, Missing('value'))
  if (!ValidValue(req.body.value)) {
    return exit(res, 422,
      `The value must be at least ${TASK_VALUE_LENGTH} characters long.`)
  }

  if (!has.Item(req.body.project)) return exit(res, 422, Missing('project'))
  if (!has.isNumber(req.body.project)) {
    return exit(res, 422, 'The project must be valid ID.')
  }

  if (!has.Item(req.body.user)) return exit(res, 422, Missing('user'))
  if (!has.isNumber(req.body.user)) {
    return exit(res, 422, 'The user must be valid ID.')
  }

  next()
}

exports.Create = Create

/**
 * Ensure the incoming request has at least one property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Update(req, res, next) {
  if (Object.keys(req.body).length < 1) {
    return exit(res, 422, 'No properties received.')
  }

  let newBody = {}

  if (!has.Item(req.body.id) || !has.isNumber(req.body.id)) {
      return exit(res, 422,
        'The task must have a valid ID.')
  }

  newBody.id = req.body.id

  if (has.Item(req.body.value)) {
    if (!ValidValue(req.body.value)) {
      return exit(res, 422,
        `The value must be at least ${TASK_VALUE_LENGTH} characters long.`)
    }
    newBody.value = req.body.value
  }

  if (has.Item(req.body.project)) {
    if (!has.isNumber(req.body.project)) {
      return exit(res, 422, 'The project must be valid ID.')
    }
    newBody.project = req.body.project
  }

  if (has.Item(req.body.user)) {
    if (!has.isNumber(req.body.user)) {
      return exit(res, 422, 'The user must be valid ID.')
    }
    newBody.user = req.body.user
  }

  // ensure only the above items are allowed for an account update
  delete req.body
  req.body = newBody

  next()
}

exports.Update = Update

/**
 * Prepare/sanitize incoming user data from a request
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Prepare(req, res, next) {

  let tmpToken = null
  let tmpParams = null
  let tmpBody = null

  if (req.body && req.body.token) {
    tmpToken = Object.assign({}, req.body.token)
    delete req.body.token
  }

  if (req.params) {
    tmpParams = Object.assign({}, req.params)
    Object.keys(tmpParams).map(item => {
      tmpParams[item] = sanitizer(tmpParams[item])
    })
    delete req.params
  }

  if (req.body) {
    tmpBody = Object.assign({}, req.body)
    Object.keys(tmpBody).map(item => {
      tmpBody[item] = sanitizer(tmpBody[item])
    })
    delete req.body
  }

  req.body = Object.assign({}, tmpBody)
  req.params = Object.assign({}, tmpParams)

  if (tmpToken) {
    req.body.token = tmpToken
  }

  next()
}

exports.Prepare = Prepare

/**
 * Validates task value
 *
 * @param     {string}    input   name
 * @returns   {boolean}
 */
function ValidValue(input) {
  return (sanitizer(input).toString().length >= TASK_VALUE_LENGTH)
}
