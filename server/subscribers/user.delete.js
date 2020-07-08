const projects = require('../services/project.service.js')
const tasks = require('../services/task.service.js')
const logger = require('../services/logger.js')
const constants = require('../constants/index')

function Init(app) {
  app.on(constants.events.DELETED_ACCOUNT,
    userDelete)

  return userDelete
}

module.exports = Init

/**
 * Deletes all tasks and projects related to a user
 *    after a trigger event
 *
 * @param {int} project
 */
function userDelete ({ id }) {
  return tasks.DeleteTasksByUser(id)
  .then(({ affectedRows }) => {
    logger.Log(`Removing ${affectedRows} tasks after user deletion. user: ${id}`)
    return projects.DeleteProjectsByUser(id)
  })
  .then(({ affectedRows }) => {
    logger.Log(`Removing ${affectedRows} projects after user deletion. user: ${id}`)
    return true
  })
  .catch(err => {
    logger.Log(err)
  })
}