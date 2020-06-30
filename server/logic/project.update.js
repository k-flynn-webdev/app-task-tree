const has = require('../helpers/has.js')
const project = require('../services/project.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Updates a project &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   project info [update properties, requires id]
 * @param {object}    app     express app
 * @returns {object}  projectObj promise
 */
function projectUpdate(input, app) {
  return project.Update(input)
    .then(() => project.GetProjectByID(input.id))
    .then(projectObj => {
      return project.SafeExport(mysqlVal(projectObj))
  })
}

module.exports = projectUpdate
