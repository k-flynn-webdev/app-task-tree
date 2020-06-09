const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const taskMiddle = require('../middlewares/task.js')
const task = require('../../services/task.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')

// todo
//    add passive token check, & if theres a user
//    id on a task double check they match

module.exports = function (app) {

  /**
   * Create a task & return
   */
  app.post('/api/task/create', taskMiddle.Create, prepareMiddle,
    function (req, res) {
    // todo check for user token and integrate

    task.Create(req.body)
    .then(({ insertId }) => task.GetTaskByID(insertId))
    .then(newTask => mysqlVal(newTask))
    .then(taskObj => {
      logger.Log('Task created, id: ' + taskObj.id)
      exit(res, 200,
          'Success your task is created',
          { task: task.SafeExport(taskObj) })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Update a task by id
   */
  app.patch('/api/task/:task', taskMiddle.Update, taskMiddle.HasParam,
    prepareMiddle, function (req, res) {

      let updateData = Object.assign(
      { id: req.params.task }, req.body)
    // todo check for user token and integrate

    task.Update(updateData)
    .then(() => task.GetTaskByID(req.body.id))
    .then(taskObj => {
      let taskObjTmp = mysqlVal(taskObj)
      logger.Log('Task updated, id: ' + taskObjTmp.id)
      exit(res, 200,
        'Success your task is updated',
        { task: task.SafeExport(taskObjTmp) })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Delete a task by id
   */
  app.delete('/api/task/:task', taskMiddle.HasParam,
    prepareMiddle, function (req, res) {

      // todo this will need securing so
      //  random peeps can't delete other items
      //  check for user token and integrate

      task.Delete(req.params.task)
      .then(taskObj => {
        logger.Log('Task deleted, id: ' + req.params.task)
        exit(res, 200,
          'Success your task is deleted')
      })
      .catch(err => {
        logger.Log(err.message || err)
        exit(res, 401, 'error', err.message || err)
      })
    })

  /**
   * Get task by id query
   */
  app.get('/api/task/:task', taskMiddle.HasParam, prepareMiddle,
    function (req, res) {

      task.GetTaskByID(req.params.task)
      .then(taskObj => {
        exit(res, 200,
          'Success task found.',
          { task: task.SafeExport(mysqlVal(taskObj)) })
      })
      .catch(err => {
        logger.Log(err.message || err)
        exit(res, 401, 'error', err.message || err)
      })
    })

  /**
   * Get all tasks by user/project id query
   */
  app.get('/api/tasks', taskMiddle.HasUserOrProject, prepareMiddle,
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

      promiseTask(promiseValue)
      .then(taskObjs => {
        let allTasks = taskObjs.filter(item => task.SafeExport(mysqlVal(item)))

        exit(res, 200,
          'Success all tasks found: ' + allTasks.length,
          { tasks: allTasks })
      })
      .catch(err => {
        logger.Log(err.message || err)
        exit(res, 401, 'error', err.message || err)
      })
    })

  return app
}
