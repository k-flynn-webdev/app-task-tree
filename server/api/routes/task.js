const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const taskMiddle = require('../middlewares/task.js')
const task = require('../../services/task.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')
const constants = require('../../constants/index')
// business
const taskCreateLogic = require('../../logic/task.create.js')
const taskUpdateLogic = require('../../logic/task.update.js')
const taskDeleteLogic = require('../../logic/task.delete.js')



// todo
//    add passive token check, & if theres a user
//    id on a task double check they match

module.exports = function (app) {

  /**
   * Create a task & return
   */
  app.post(constants.paths.API_TASK_CREATE,
    taskMiddle.Create,
    token.Required,
    prepareMiddle,
    function (req, res) {

      taskCreateLogic(req.body, app)
      .then(taskObj => {
        logger.Log('Task created, id: ' + taskObj.id, req)
        exit(res, 201,
          constants.messages.SUCCESS_CREATED_TASK,
            { task: taskObj })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
  })

  /**
   * Update a task by id
   */
  app.patch(constants.paths.API_TASK(),
    taskMiddle.HasParam,
    taskMiddle.Update,
    token.Required,
    prepareMiddle,
    function (req, res) {

    req.body.id = req.params.task

    taskUpdateLogic(req.body, app)
    .then(taskObj => {
      logger.Log('Task updated, id: ' + taskObj.id, req)
      exit(res, 202,
        constants.messages.SUCCESS_UPDATED_TASK,
        { task: taskObj })
    })
    .catch(err => {
      logger.Log(err.message || err, req)
      exit(res, 400, err || 'error')
    })
  })

  /**
   * Delete a task by id
   */
  app.delete(constants.paths.API_TASK(),
    taskMiddle.HasParam,
    token.Required,
    prepareMiddle,
    function (req, res) {

      req.body.id = req.params.task

      taskDeleteLogic(req.body, app)
      .then(taskObj => {
        logger.Log('Task deleted, id: ' + taskObj.id, req)
        exit(res, 202,
          constants.messages.SUCCESS_DELETED_TASK)
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Get task by id query
   */
  app.get(constants.paths.API_TASK(),
    taskMiddle.HasParam,
    token.Required,
    prepareMiddle,
    function (req, res) {

      req.body.id = req.params.task

      task.GetTaskByID(req.body.id)
      .then(taskObj => {
        if (!taskObj || taskObj.length < 1) {
          return exit(res, 404,
            constants.errors.TASK_NOT_FOUND)
        }

        exit(res, 200,
          constants.messages.SUCCESS,
          { task: task.SafeExport(mysqlVal(taskObj)) })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Get all tasks by user/project id query
   */
  app.get(constants.paths.API_TASKS,
    taskMiddle.HasUserOrProject,
    token.Required,
    prepareMiddle,
    function (req, res) {

    // todo implement pagination or search by date ..

      let promiseValue = -1
      let promiseTask = null

      if (has.hasAnItem(req.query.user)){
        promiseTask = task.GetTasksByUser
        promiseValue = req.body.token.id
      }
      if (has.hasAnItem(req.query.project)){
        promiseTask = task.GetTasksByProject
        promiseValue = req.query.project
      }

      return promiseTask(promiseValue)
      .then(taskObjs => {
        const allSafeTasks = taskObjs.map(item => task.SafeExport(item))
        exit(res, 200,
          constants.messages.SUCCESS_FOUND_TASKS + allSafeTasks.length,
          { tasks: allSafeTasks })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  return app
}
