const has = require('../helpers/has.js')
const logger = require('../services/logger.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const tasks = require('../services/task.service.js')
const projects = require('../services/project.service.js')
const constants = require('../constants/index')

function Init(app) {
  app.on(constants.events.UPDATE_PROGRESS_PROJECT,
    UpdateProjectProgress)
}

module.exports = Init

/**
 * Update a projects progress and task count
 *    after a trigger event
 *
 * @param id
 */
function UpdateProjectProgress ({ project }) {
  return tasks.GetTasksByProject(project)
  .then(allTasks => {
      const projectUpdate = {
        id: project,
        tasksTotal: allTasks.length,
        tasksDone: allTasks.filter(item => item.isDone === 1).length,
        isDone: false
      }

      if (projectUpdate.tasksDone === projectUpdate.tasksTotal) {
        if (projectUpdate.tasksTotal > 0){
          projectUpdate.isDone = true
        }
      }

     return projects.Update(projectUpdate)
  })
  .catch(err => {
    logger.Log(err)
  })
}