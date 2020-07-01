const logger = require('../services/logger.js')
const tasks = require('../services/task.service.js')
const constants = require('../constants/index')

function Init(app) {
  app.on(constants.events.DELETED_PROJECT,
    deleteTasksOnProjectDelete)

  return deleteTasksOnProjectDelete
}

module.exports = Init

/**
 * Removes all tasks related to a project
 *    after a trigger event
 *
 * @param {int} project
 */
function deleteTasksOnProjectDelete ({ project }) {
  return tasks.DeleteTasksByProject(project)
  .then(({ affectedRows }) => {
    logger.Log(`Removing ${affectedRows} tasks after project deletion. Project: ${project}`)
  })
  .catch(err => {
    logger.Log(err)
  })
}