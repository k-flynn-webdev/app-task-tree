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
    prepareMiddle,
    function (req, res) {
    // todo check for user token and integrate

      taskCreateLogic(req.body, app)
      .then(taskObj => {
        logger.Log('Task created, id: ' + taskObj.id, req)
        exit(res, 201,
          constants.messages.SUCCESS_CREATED_TASK,
            { task: taskObj })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err.message || 'error', err)
      })
  })

  /**
   * Update a task by id
   */
  app.patch(constants.paths.API_TASK(),
    taskMiddle.Update,
    taskMiddle.HasParam,
    prepareMiddle,
    function (req, res) {

      let updateData = Object.assign(
      { id: req.params.task }, req.body)
    // todo check for user token and integrate

    taskUpdateLogic(updateData, app)
    .then(taskObj => {
      logger.Log('Task updated, id: ' + taskObj.id, req)
      exit(res, 202,
        constants.messages.SUCCESS_UPDATED_TASK,
        { task: taskObj })
    })
    .catch(err => {
      logger.Log(err.message || err, req)
      exit(res, 400, err.message || 'error', err)
    })
  })

  /**
   * Delete a task by id
   */
  app.delete(constants.paths.API_TASK(),
    taskMiddle.HasParam,
    prepareMiddle,
    function (req, res) {

      // todo this will need securing so
      //  random peeps can't delete other items
      //  check for user token and integrate

      taskDeleteLogic({ id: req.params.task }, app)
      .then(taskObj => {
        logger.Log('Task deleted, id: ' + taskObj.id, req)
        exit(res, 202,
          constants.messages.SUCCESS_DELETED_TASK)
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err.message || 'error', err)
      })
    })

  /**
   * Get task by id query
   */
  app.get(constants.paths.API_TASK(),
    taskMiddle.HasParam,
    prepareMiddle,
    function (req, res) {

      task.GetTaskByID(req.params.task)
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
        exit(res, 400, err.message || 'error', err)
      })
    })

  /**
   * Get all tasks by user/project id query
   */
  app.get(constants.paths.API_TASKS,
    taskMiddle.HasUserOrProject,
    prepareMiddle,
    function (req, res) {

      // todo check for user token and integrate
      // todo implement pagination or search by date ..

      let promiseValue = -1
      let promiseTask = null

      if (has.hasAnItem(req.query.user)){
        promiseTask = task.GetTasksByUser
        promiseValue = req.query.user
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
        exit(res, 400, err.message || 'error', err)
      })
    })

  return app
}
