const has = require('../helpers/has.js')
const task = require('../services/task.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Creates a task &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   task info [project, user, text]
 * @param {object}    app     express app
 * @returns {object}  taskObj promise
 */
function taskCreate(input, app) {

  input.user = input.token.id

  return task.Create(input)
    .then(({ insertId }) => task.GetTaskByID(insertId))
    .then(newTask => mysqlVal(newTask))
    .then(taskObj => {
      app.emit(constants.events.UPDATE_PROGRESS_PROJECT,
        { project: taskObj.project })
      return task.SafeExport(taskObj)
  })
}

module.exports = taskCreate
