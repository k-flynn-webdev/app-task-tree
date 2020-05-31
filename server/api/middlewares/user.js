const sanitizer = require('sanitizer').sanitize

const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

const VERIFY_LENGTH = 50
const RECOVER_LENGTH = 50

/**
 * @return {string}
 */
function Missing(property) {
  return `Missing ${property} field.`
}

/**
 * Ensure the incoming request has a name, email and password property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Create(req, res, next) {
  if (!has.Item(req.body.name)) return exit(res, 422, Missing('name'))
  if (!ValidName(req.body.name)) {
    return exit(res, 422, 'The name must be at least 4 characters long.')
  }

  if (!has.Item(req.body.email)) return exit(res, 422, Missing('email'))
  if (!ValidEmail(req.body.email)) {
    return exit(res, 422, 'The email must be valid.')
  }

  if (!has.Item(req.body.password)) return exit(res, 422, Missing('password'))
  if (!ValidPassword(req.body.password)) {
    return exit(res, 422,
      'Password must be at least 8 characters long, ' +
      'have a number and uppercase letter.')
  }

  next()
}

exports.Create = Create

/**
 * Ensure the incoming request has a verify parameter
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Verify(req, res, next) {
  if (!has.Item(req.params)) return exit(res, 422, 'Missing verify link.')
  if (!has.Item(req.params.verify)) return exit(res, 422, 'Missing verify link.')
  if (req.params.verify.length < VERIFY_LENGTH) return exit(res, 422, 'Invalid verify link.')

  next()
}

exports.Verify = Verify

/**
 * Ensure the incoming request has a recovery parameter
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Recover(req, res, next) {
  if (!has.Item(req.params)) return exit(res, 422, 'Missing recover link.')
  if (!has.Item(req.params.recover)) return exit(res, 422, 'Missing recover link.')
  if (req.params.recover.length < RECOVER_LENGTH) return exit(res, 422, 'Invalid recover link.')

  next()
}

exports.Recover = Recover

/**
 * Ensure the incoming request has a email and password property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Login(req, res, next) {
  if (!has.Item(req.body.email)) return exit(res, 422, Missing('email'))
  if (!has.Item(req.body.password)) return exit(res, 422, Missing('password'))

  next()
}

exports.Login = Login

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

  if (has.Item(req.body.name)) {
    if (!ValidName(req.body.name)) {
      return exit(res, 422, 'The name must be at least 4 characters long.')
    }
    newBody.name = req.body.name
  }

  if (has.Item(req.body.email)) {
    if (!ValidEmail(req.body.email)) {
      return exit(res, 422, 'The email must be valid.')
    }
    newBody.email = req.body.email
  }

  if (has.Item(req.body.password)) {
    if (!ValidPassword(req.body.password)) {
      return exit(res, 422,
        'Password must be at least 8 characters long, ' +
        'have a number and uppercase letter.')
    }
    newBody.password = req.body.password
  }

  // ensure only the above items are allowed for an account update
  delete req.body
  req.body = newBody

  next()
}

exports.Update = Update

/**
 * Ensure the incoming request has a email property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasEmail(req, res, next) {
  if (!has.Item(req.body.email)) return exit(res, 422, Missing('email'))

  next()
}

exports.HasEmail = HasEmail

/**
 * Ensure the incoming request has a password property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasPassword(req, res, next) {
  if (!has.Item(req.body.password)) return exit(res, 422, Missing('password'))

  next()
}

exports.HasPassword = HasPassword

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
 * Validates name
 *
 * @param     {string}    input   name
 * @returns   {boolean}
 */
function ValidName(input) {
  return (sanitizer(input).toString().length >= 4)
}

/**
 * Validates email
 *
 * @param 	  {string} 	  input		email address
 * @returns   {boolean}
 */
function ValidEmail(input) {
  let emailTmp = sanitizer(input)
  let tmp = emailTmp.split('@')
  if (emailTmp.length < 5 || tmp.length < 2) return false
  let domainStop = tmp[1].indexOf('.')
  return (domainStop > 0 && domainStop < tmp[1].length - 1)
}

/**
 * Validates password
 *
 * @param     {string}    input   password
 * @returns   {boolean}
 */
function ValidPassword(input) {
  let passTmp = sanitizer(input)
  return (passTmp.length >= 8 && has.Number(passTmp) && has.UpperCase(passTmp))
}
