const checkId = require('./checkId.js')
const checkUser = require('./checkUser.js')
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
  if (!checkName.valid(req, res)) return
  if (!checkEmail.required(req, res)) return
  if (!checkEmail.valid(req, res)) return
  if (!checkPassword.required(req, res)) return
  if (!checkPassword.valid(req, res)) return

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
  if (!has.hasAnItem(req.query))
  {
    exit (res, 400, 'Missing verify link.')
    return false
  }
  if (!has.hasAnItem(req.query.verify)) {
    exit(res, 400, 'Missing verify link.')
    return false
  }
  if (req.query.verify.length < VERIFY_LENGTH) {
    exit(res, 400, 'Invalid verify link.')
    return false
  }

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
  if (!has.hasAnItem(req.query)) {
    exit(res, 400, 'Missing recover link.')
    return false
  }
  if (!has.hasAnItem(req.query.recover)) {
    exit(res, 400, 'Missing recover link.')
    return false
  }
  if (req.query.recover.length < RECOVER_LENGTH) {
    exit(res, 400, 'Invalid recover link.')
    return false
  }

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
  varCount = Object.keys(req.body).filter(item => item !== 'id').length
  if (varCount < 1) {
    exit(res, 400, 'No properties received.')
    return false
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
 * Ensure the incoming request has a id property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Delete(req, res, next) {
  if (!checkId.required(req, res)) return

  next()
}

exports.Delete = Delete

/**
 * Ensure the incoming request has a user property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasUser(req, res, next) {

  if (!checkUser.required(req, res)) return

  next()
}

exports.HasUser = HasUser

/**
 * Ensure the incoming request has a user param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasParam(req, res, next) {

  if (!checkUser.HasParam(req, res)) return

  next()
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a user query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasQuery(req, res, next) {

  if (!checkUser.HasQuery(req, res)) return

  next()
}

exports.HasQuery = HasQuery