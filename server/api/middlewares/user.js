const checkId = require('./checkId.js')
const checkName = require('./checkName.js')
const checkEmail = require('./checkEmail.js')
const checkPassword = require('./checkPassword.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

const VERIFY_LENGTH = 50
const RECOVER_LENGTH = 50


/**
 * Ensure the incoming request has a name, email and password property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Create(req, res, next) {

  if (!checkName.required(req, res)) return
  if (!checkEmail.required(req, res)) return
  if (!checkPassword.required(req, res)) return

  next()
}

exports.Create = Create

/**
 * Ensure the incoming request has a verify query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Verify(req, res, next) {
  if (!has.hasAnItem(req.query)) return exit(res, 422,
    'Missing verify link.')
  if (!has.hasAnItem(req.query.verify)) return exit(res, 422,
    'Missing verify link.')
  if (req.query.verify.length < VERIFY_LENGTH) return exit(res, 422,
    'Invalid verify link.')

  next()
}

exports.Verify = Verify

/**
 * Ensure the incoming request has a recovery query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Recover(req, res, next) {
  if (!has.hasAnItem(req.query)) return exit(res, 422,
    'Missing recover link.')
  if (!has.hasAnItem(req.query.recover)) return exit(res, 422,
    'Missing recover link.')
  if (req.query.recover.length < RECOVER_LENGTH) return exit(res, 422,
    'Invalid recover link.')

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
  if (!checkEmail.required(req, res)) return
  if (!checkPassword.required(req, res)) return

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

  if (!checkId.required(req, res)) return
  newBody.id = req.body.id

  if (!checkName.valid(req, res)) return
  if (!checkEmail.valid(req, res)) return
  if (!checkPassword.valid(req, res)) return

  if (has.hasAnItem(req.body.name)) {
    newBody.name = req.body.name
  }

  if (has.hasAnItem(req.body.email)) {
    newBody.email = req.body.email
  }

  if (has.hasAnItem(req.body.password)) {
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
function Email(req, res, next) {
  if (!checkEmail.required(req, res)) return

  next()
}

exports.Email = Email
