const has = require('../helpers/has.js')
const logger = require('../services/logger.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const tasks = require('../services/task.service.js')
const projects = require('../services/project.service.js')
const constants = require('../constants/index')

function Init(app) {
  app.on(constants.events.UPDATE_PROGRESS_PROJECT,
    UpdateProject)

  return UpdateProject
}

module.exports = Init

/**
 * Update a projects progress and task count
 *    after a trigger event
 *
 * @param id
 */
function UpdateProject ({ project }) {
  return tasks.GetTasksByProject(project)
  // .then(allTasks => {
  //     // const prjUpd = {
  //     //   id: project,
  //     //   tasksTotal: allTasks.length,
  //     //   tasksDone: allTasks.filter(item => item.isDone === 1).length,
  //     //   isDone: false
  //     // }
  //
  //   // if (prjUpd.tasksTotal > 0){
  //   //   prjUpd.isDone = (prjUpd.tasksDone === prjUpd.tasksTotal)
  //   // }
  //   //
  //   //  return projects.Update(prjUpd)
  // })
  // .catch(err => {
  //   logger.Log(err)
  // })
}