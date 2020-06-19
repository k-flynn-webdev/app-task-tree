const checkId = require('./checkId.js')
const checkName = require('./checkName.js')
const checkUser = require('./checkUser.js')
const checkProject = require('./checkProject.js')
const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

/**
 * Ensure the incoming request has a name and user id property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Create(req, res, next) {

  if (!checkName.required(req, res)) return
  if (!checkName.valid(req, res)) return
  if (!checkUser.required(req, res)) return
  if (!checkUser.valid(req, res)) return

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

  if (!checkId.required(req, res)) return
  newBody.id = req.body.id

  if (!checkName.valid(req, res)) return
  if (!checkUser.valid(req, res)) return
  if (!checkProject.valid(req, res)) return


  if (has.hasAnItem(req.body.name)) {
    newBody.name = req.body.name
  }

  if (has.hasAnItem(req.body.user)) {
    newBody.user = req.body.user
  }

  // ensure only the above items are allowed for an account update
  delete req.body
  req.body = newBody

  next()
}

exports.Update = Update

/**
 * Ensure the incoming request has an Id property
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
 * Ensure the incoming request has a project param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasParam(req, res, next) {

  if (!checkProject.HasParam(req, res)) return

  next()
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a project query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasQuery(req, res, next) {

  if (!checkProject.HasQuery(req, res)) return

  next()
}

exports.HasQuery = HasQuery