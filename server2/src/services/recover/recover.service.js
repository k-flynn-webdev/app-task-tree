// Initializes the `recover` service on path `/recover`
const { Recover } = require('./recover.class')
const createModel = require('../../models/recover.model')
const hooks = require('./recover.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  const constants = app.get('constants')

  // Initialize our service with any options it requires
  app.use(constants.path.recover, new Recover(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.path.recover)

  service.hooks(hooks)
}
