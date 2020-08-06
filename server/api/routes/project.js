const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const projectMiddle = require('../middlewares/project.js')
const project = require('../../services/project.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')
const constants = require('../../constants/index')
// business
const projectCreateLogic = require('../../logic/project.create.js')
const projectUpdateLogic = require('../../logic/project.update.js')
const projectDeleteLogic = require('../../logic/project.delete.js')


module.exports = function (app) {

  /**
   * Create a project & return
   */
  app.post(constants.paths.API_PROJECT_CREATE,
    projectMiddle.Create,
    token.Required,
    prepareMiddle,
    function (req, res) {

    projectCreateLogic(req.body, app)
    .then(projectObj => {
      logger.Log('Project created, id: ' + projectObj.id, req)
        exit(res, 201,
          constants.messages.SUCCESS_CREATED_PROJECT,
          { project: projectObj })
    })
    .catch(err => {
      logger.Log(err.message || err, req)
      exit(res, 400, err || 'error')
    })
  })

  /**
   * Update a project by id
   */
  app.patch(constants.paths.API_PROJECT(),
    projectMiddle.Update,
    projectMiddle.HasParam,
    token.Required,
    prepareMiddle,
    function (req, res) {

    req.body.id = req.params.project

    projectUpdateLogic(req.body, app)
    .then(projectObj => {
      logger.Log('Project updated, id: ' + projectObj.id, req)
      exit(res, 202,
        constants.messages.SUCCESS_UPDATED_PROJECT,
        { project: projectObj })
    })
    .catch(err => {
      logger.Log(err.message || err, req)
      exit(res, 400, err || 'error')
    })
  })

  /**
   * Delete a project by id
   */
  app.delete(constants.paths.API_PROJECT(),
    projectMiddle.HasParam,
    token.Required,
    prepareMiddle,
    function (req, res) {

      req.body.id = req.params.project

      projectDeleteLogic(req.body, app)
      .then(projectObj => {
        logger.Log('Project deleted, id: ' + projectObj.id, req)
        exit(res, 202,
          constants.messages.SUCCESS_DELETED_PROJECT)
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Get project by id
   */
  app.get(constants.paths.API_PROJECT(),
    projectMiddle.HasParam,
    token.Required,
    prepareMiddle,
    function (req, res) {

      project.GetProjectByID(req.params.project)
      .then(projectObj => {
        if (!projectObj || projectObj.length < 1) {
          throw { status: 404,
            message: constants.errors.PROJECT_NOT_FOUND }
        }

        exit(res, 200,
          constants.messages.SUCCESS,
          { project: project.SafeExport(mysqlVal(projectObj)) })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Get all projects by user id
   */
  app.get(constants.paths.API_PROJECTS,
    userMiddle.HasQuery,
    token.Required,
    prepareMiddle,
    function (req, res) {

      // todo implement pagination or search by date ..
      let showDone = true
      let sortAsc = false
      let sortType = 'updated'

      console.log(req.query)

      if (has.hasAnItem(req.query.showDone)) {
        showDone = req.query.showDone.indexOf('true') >= 0
      }
      if (has.hasAnItem(req.query.sortAsc)) {
        sortAsc = req.query.sortAsc.indexOf('true') >= 0
      }
      if (has.hasAnItem(req.query.sortType)) {
        sortType = req.query.sortType
      }

      project.GetProjectsByUser(req.body.token.id,
        { showDone, sortAsc, sortType })
      .then(projectObjs => {
        const allSafeProjects = projectObjs.map(item => project.SafeExport(item))
        exit(res, 200,
          constants.messages.SUCCESS_FOUND_PROJECTS + allSafeProjects.length,
          { projects: allSafeProjects })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  return app
}
