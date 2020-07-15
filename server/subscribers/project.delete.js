const logger = require('../services/logger.js')
const tasks = require('../services/task.service.js')
const constants = require('../constants/index')

function Init(app) {
  app.on(constants.events.DELETED_PROJECT,
    projectDelete)

  return projectDelete
}

module.exports = Init

/**
 * Deletes all tasks related to a project
 *    after a trigger event
 *
 * @param {int} project
 */
function projectDelete ({ project }) {
  return tasks.DeleteTasksByProject(project)
  .then(({ affectedRows }) => {
    logger.Log(`Removing ${affectedRows} tasks after project deletion. Project: ${project}`)
  })
  .catch(err => {
    logger.Log(err)
  })
}