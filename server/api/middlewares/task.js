const checkId = require('./checkId.js')
const checkText = require('./checkText.js')
const checkUser = require('./checkUser.js')
const checkTask = require('./checkTask.js')
const checkProject = require('./checkProject.js')
const missing = require('./missing.js')
const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')

/**
 * Ensure the incoming request has a text, project id and user id property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function Create(req, res, next) {

  if (!checkText.required(req, res)) return
  if (!checkText.valid(req, res)) return
  if (!checkUser.required(req, res)) return
  if (!checkUser.valid(req, res)) return
  if (!checkProject.required(req, res)) return
  if (!checkProject.valid(req, res)) return

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

  if (!checkText.valid(req, res)) return
  if (!checkUser.valid(req, res)) return
  if (!checkProject.valid(req, res)) return


  if (has.hasAnItem(req.body.text)) {
    newBody.text = req.body.text
  }

  if (has.hasAnItem(req.body.project)) {
    newBody.project = req.body.project
  }

  if (has.hasAnItem(req.body.user)) {
    newBody.user = req.body.user
  }

  if (has.hasAnItem(req.body.isDone)) {
    newBody.isDone = req.body.isDone
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
 * Ensure the incoming request has a User or Project id property
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasUserOrProject(req, res, next) {
  let hasEither = (has.hasAnItem(req.query.user) || has.hasAnItem(req.query.project))
  if (!hasEither) return exit(res, 422, missing('user or project'))


  if (has.hasAnItem(req.query.user)) {
    if (!has.isANumber(req.query.user)) {
      return exit(res, 422, 'The user must be valid.')
    }
  }

  if (has.hasAnItem(req.query.project)) {
    if (!has.isANumber(req.query.project)) {
      return exit(res, 422, 'The project must be valid.')
    }
  }

  next()
}

exports.HasUserOrProject = HasUserOrProject

/**
 * Ensure the incoming request has a task param
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasParam(req, res, next) {

  if (!checkTask.HasParam(req, res)) return

  next()
}

exports.HasParam = HasParam

/**
 * Ensure the incoming request has a task query
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function HasQuery(req, res, next) {

  if (!checkTask.HasQuery(req, res)) return

  next()
}

exports.HasQuery = HasQuery

