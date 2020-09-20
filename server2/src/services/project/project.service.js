// Initializes the `project` service on path `/projects`
const { Project } = require('./project.class')
const createModel = require('../../models/project.model')
const hooks = require('./project.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  const constants = app.get('constants')

  // Initialize our service with any options it requires
  app.use(constants.path.project, new Project(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.path.project)

  service.hooks(hooks)
}
