const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const projectMiddle = require('../middlewares/project.js')
const project = require('../../services/project.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')

// todo
//    add passive token check, & if theres a user
//    id on a project double check they match

module.exports = function (app) {

  /**
   * Create a project & return
   */
  app.post('/api/project/create', projectMiddle.Create, prepareMiddle,
    function (req, res) {
    // todo check for user token and integrate

    project.Create(req.body)
    .then(({ insertId }) => project.GetProjectByID(insertId))
    .then(newProject => mysqlVal(newProject))
    .then(projectObj => {
      logger.Log('Project created, id: ' + projectObj.id)
        exit(res, 200,
          'Success your project is created',
          { project: project.SafeExport(projectObj) })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Update a project by id
   */
  app.patch('/api/project/:project', projectMiddle.Update, projectMiddle.HasParam,
    prepareMiddle, function (req, res) {

      let updateData = Object.assign(
        { id: req.params.task }, req.body)
      // todo check for user token and integrate

    project.Update(updateData)
    .then(() => project.GetProjectByID(req.params.project))
    .then(projectObj => {
      let projectObjTmp = mysqlVal(projectObj)
      logger.Log('Project updated, id: ' + req.params.project)
      exit(res, 200,
        'Success your project is updated',
        { project: project.SafeExport(projectObjTmp) })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Delete a project by id
   */
  app.delete('/api/project/:project', projectMiddle.HasParam, prepareMiddle,
    function (req, res) {

      // todo check for user token and integrate

      project.Delete(req.params.project)
      .then(projectObj => {
        let projectObjTmp = mysqlVal(projectObj)
        logger.Log('Project deleted, id: ' + projectObjTmp.id)
        exit(res, 200,
          'Success your project is deleted',
          { project: project.SafeExport(projectObjTmp) })
      })
      .catch(err => {
        logger.Log(err.message || err)
        exit(res, 401, 'error', err.message || err)
      })
    })

  /**
   * Get project by id
   */
  app.get('/api/project/:project', projectMiddle.HasParam,
    prepareMiddle, function (req, res) {

      project.GetProjectByID(req.params.project)
      .then(projectObj => {
        let projectObjTmp = mysqlVal(projectObj)
        exit(res, 200,
          'Success project found.',
          { project: project.SafeExport(projectObjTmp) })
      })
      .catch(err => {
        logger.Log(err.message || err)
        exit(res, 401, 'error', err.message || err)
      })
    })

  /**
   * Get all projects by user id
   */
  app.get('/api/projects', userMiddle.HasQuery, prepareMiddle,
    function (req, res) {

      // todo check for user token and integrate
      // todo implement pagination or search by date ..

      project.GetProjectsByUser(req.query.user)
      .then(projectObjs => {
        let allProjects =
          projectObjs.filter(item => project.SafeExport(mysqlVal(item)))
        exit(res, 200,
          'Success all projects found: ' + allProjects.length,
          { projects: allProjects })
      })
      .catch(err => {
        logger.Log(err.message || err)
        exit(res, 401, 'error', err.message || err)
      })
    })

  return app
}
