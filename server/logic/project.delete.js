const has = require('../helpers/has.js')
const project = require('../services/project.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Deletes a project &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   project info [project, user, text, user permission]
 * @param {object}    app     express app
 * @returns {object}  projectObj promise
 */
function projectDelete(input, app) {
  return project.GetProjectByID(input.id)
  .then(prjFnd => {
    let projectObj = mysqlVal(prjFnd)

    if (!has.hasAnItem(projectObj)) {
      throw {
        status: 404,
        message: constants.errors.PROJECT_NOT_FOUND
      }
    }

    return Promise.all(
      [Promise.resolve(projectObj),
        project.Delete(input.id)])
  })
  .then(([projectObj, deleted]) => {
    app.emit(constants.events.DELETED_PROJECT,
      { project: projectObj.id })

    return project.SafeExport(projectObj)
  })
}

module.exports = projectDelete
