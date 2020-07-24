const has = require('../helpers/has.js')
const project = require('../services/project.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Creates a project &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   project info [project, user, text]
 * @param {object}    app     express app
 * @returns {object}  projectObj promise
 */
function projectCreate(input, app) {

  input.user = input.token.id

  return project.Create(input)
    .then(({ insertId }) => project.GetProjectByID(insertId))
    .then(projectObj => project.SafeExport(mysqlVal(projectObj)))
}

module.exports = projectCreate
