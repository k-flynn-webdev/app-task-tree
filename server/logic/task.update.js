const has = require('../helpers/has.js')
const task = require('../services/task.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Updates a task &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   task info [update properties, requires id]
 * @param {object}    app     express app
 * @returns {object}  taskObj promise
 */
function taskUpdate(input, app) {

  input.user = input.token.id

  return task.GetTaskByID(input.id)
    .then(tskFnd => {
      let taskObj = mysqlVal(tskFnd)

      if (!has.hasAnItem(taskObj)) {
        throw {
          status: 404,
          message: constants.errors.TASK_NOT_FOUND
        }
      }

      return task.Update(input)
    })
    .then(() => task.GetTaskByID(input.id))
    .then(taskObj => {
      let taskObjTmp = mysqlVal(taskObj)

      if (has.hasAnItem(input.isDone)) {
        app.emit(constants.events.UPDATE_PROGRESS_PROJECT,
          { project: taskObjTmp.project })
      }

      return task.SafeExport(taskObjTmp)
  })
}

module.exports = taskUpdate
